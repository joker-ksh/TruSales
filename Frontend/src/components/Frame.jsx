// src/components/Frame.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './Header';
import { FilterBar } from './FilterBar';
import { StatsSection } from './StatsSection';
import { TransactionTable } from './TransactionTable';
import { Pagination } from './Pagination';
import { useFilters } from '../hooks/useFilters';
import { filterTransactions, sortTransactions } from '../utils/filterUtils';
import { fetchSalesData, transformApiData } from '../services/api';

export const Frame = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [sortBy, setSortBy] = useState(''); // No default sort
  
  // API data states
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);
  
  const { filters, setters, resetFilters } = useFilters();

  // Fetch data from API whenever search, page, or filters change
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Parse sortBy into sort field and order
        let sortField = null;
        let sortOrder = null;
        
        if (sortBy) {
          const [field, order] = sortBy.split('-');
          sortField = field; // 'name', 'date', or 'quantity'
          sortOrder = order; // 'asc' or 'desc'
        }
        
        const response = await fetchSalesData({
          search: searchQuery,
          page: currentPage,
          sort: sortField,
          order: sortOrder,
          filters: filters
        });
        
        if (response.success) {
          const transformedData = transformApiData(response.data);
          setApiData(transformedData);
          setIsLastPage(response.isLastPage);
        }
      } catch (err) {
        setError(err.message);
        setApiData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, currentPage, sortBy, filters.region, filters.gender, filters.ageRange, filters.category, filters.payment, filters.dateRange]);

  // No client-side filtering - backend handles everything
  const displayedTransactions = useMemo(() => {
    return apiData;
  }, [apiData]);

  const handleResetFilters = () => {
    resetFilters();
    setSearchQuery('');
    setCurrentPage(1);
    setSortBy(''); // Reset sort too
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to page 1 when searching
  };

  return (
    <div className="flex flex-col w-full max-w-[1236px] mx-auto bg-white min-h-screen">
      <Header searchQuery={searchQuery} setSearchQuery={handleSearchChange} />

      <FilterBar
        filters={filters}
        setters={setters}
        resetFilters={handleResetFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
      />

      <StatsSection transactions={displayedTransactions} />

      {/* Loading State */}
      {isLoading && (
        <div className="flex-1 flex items-center justify-center py-12 bg-gray-50">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
            <p className="mt-3 text-gray-600">Loading transactions...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="flex-1 flex items-center justify-center py-12 bg-gray-50">
          <div className="text-center px-4">
            <p className="text-red-600 mb-2">Error loading data</p>
            <p className="text-gray-600 text-sm">{error}</p>
            <button
              onClick={() => setCurrentPage(1)}
              className="mt-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      {!isLoading && !error && (
        <TransactionTable transactions={displayedTransactions} />
      )}

      <Pagination 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        isLastPage={isLastPage}
        isLoading={isLoading}
      />
    </div>
  );
};