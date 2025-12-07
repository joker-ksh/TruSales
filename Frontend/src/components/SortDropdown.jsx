// src/components/SortDropdown.jsx

import React from 'react';
import { SORT_OPTIONS } from '../utils/constants';

export const SortDropdown = ({ sortBy, setSortBy, activeDropdown, setActiveDropdown }) => {
  const isOpen = activeDropdown === 'sort';
  const currentSort = sortBy ? SORT_OPTIONS.find(opt => opt.value === sortBy) : null;
  
  return (
    <div className="relative">
      <button
        onClick={() => setActiveDropdown(isOpen ? null : 'sort')}
        className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 rounded text-sm text-gray-700 hover:bg-gray-200 transition-colors"
      >
        <span>Sort by{currentSort ? `: ${currentSort.label}` : ''}</span>
        <img
          className="w-4 h-4"
          alt="Arrow down"
          src="https://c.animaapp.com/miuio6dnjIQft9/img/vuesax-linear-arrow-down.svg"
        />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setActiveDropdown(null)}
          />
          <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-20 min-w-[200px]">
            {/* Add "None" option */}
            <button
              onClick={() => {
                setSortBy('');
                setActiveDropdown(null);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                sortBy === '' ? 'bg-gray-50 font-medium' : ''
              }`}
            >
              None (Default)
            </button>
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setSortBy(option.value);
                  setActiveDropdown(null);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                  sortBy === option.value ? 'bg-gray-50 font-medium' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};