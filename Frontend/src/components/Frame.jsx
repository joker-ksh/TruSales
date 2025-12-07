// src/components/Frame.jsx

import React, { useState, useMemo } from 'react';
import { Header } from './Header';
import { FilterBar } from './FilterBar';
import { StatsSection } from './StatsSection';
import { TransactionTable } from './TransactionTable';
import { Pagination } from './Pagination';
import { useFilters } from '../hooks/useFilters';
import { filterTransactions, sortTransactions } from '../utils/filterUtils';
import { TRANSACTIONS } from '../servieces/mockData';

export const Frame = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [sortBy, setSortBy] = useState('name-asc');
  
  const { filters, setters, resetFilters } = useFilters();

  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    const filtered = filterTransactions(TRANSACTIONS, filters, searchQuery);
    return sortTransactions(filtered, sortBy);
  }, [filters, searchQuery, sortBy]);

  const handleResetFilters = () => {
    resetFilters();
    setSearchQuery('');
  };

  return (
    <div className="flex flex-col w-full max-w-[1236px] mx-auto bg-white min-h-screen">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <FilterBar
        filters={filters}
        setters={setters}
        resetFilters={handleResetFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
      />

      <StatsSection transactions={filteredAndSortedTransactions} />

      <TransactionTable transactions={filteredAndSortedTransactions} />

      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};