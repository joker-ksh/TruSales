// src/components/FilterBar.jsx

import React from 'react';
import { Dropdown } from './Dropdown';
import { SortDropdown } from './SortDropdown';
import { FILTER_OPTIONS } from '../utils/constants';

export const FilterBar = ({ 
  filters, 
  setters, 
  resetFilters, 
  sortBy, 
  setSortBy, 
  activeDropdown, 
  setActiveDropdown 
}) => {
  return (
    <section className="px-5 py-4 bg-white flex items-center justify-between">
      <div className="inline-flex items-center gap-2.5">
        <button 
          onClick={resetFilters}
          className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          title="Reset filters"
        >
          <img
            className="w-4 h-4"
            alt="Reset filters"
            src="https://c.animaapp.com/miuio6dnjIQft9/img/vuesax-linear-rotate-left.svg"
          />
        </button>

        <Dropdown
          id="region"
          label="Customer Region"
          options={FILTER_OPTIONS.region}
          selected={filters.region}
          onSelect={setters.setSelectedRegion}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
        
        <Dropdown
          id="gender"
          label="Gender"
          options={FILTER_OPTIONS.gender}
          selected={filters.gender}
          onSelect={setters.setSelectedGender}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
        
        <Dropdown
          id="age"
          label="Age Range"
          options={FILTER_OPTIONS.ageRange}
          selected={filters.ageRange}
          onSelect={setters.setSelectedAgeRange}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
        
        <Dropdown
          id="category"
          label="Product Category"
          options={FILTER_OPTIONS.category}
          selected={filters.category}
          onSelect={setters.setSelectedCategory}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
        
        <Dropdown
          id="payment"
          label="Payment Method"
          options={FILTER_OPTIONS.payment}
          selected={filters.payment}
          onSelect={setters.setSelectedPayment}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
        
        <Dropdown
          id="date"
          label="Date"
          options={FILTER_OPTIONS.dateRange}
          selected={filters.dateRange}
          onSelect={setters.setSelectedDateRange}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
      </div>

      <SortDropdown 
        sortBy={sortBy} 
        setSortBy={setSortBy}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
      />
    </section>
  );
};