// src/components/Pagination.jsx

import React, { useState } from 'react';

export const Pagination = ({ 
  currentPage, 
  onPageChange, 
  isLastPage,
  isLoading 
}) => {
  const [pageInput, setPageInput] = useState('');
  const [showPageInput, setShowPageInput] = useState(false);

  // Generate visible page numbers (show current and surrounding pages)
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 6;
    
    // If current page is within first 6 pages, show 1-6
    if (currentPage <= maxVisible) {
      for (let i = 1; i <= Math.min(maxVisible, currentPage + 2); i++) {
        pages.push(i);
      }
    } else {
      // Show current page and surrounding pages
      const start = currentPage - 2;
      const end = currentPage + 2;
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const handlePageInputSubmit = (e) => {
    e.preventDefault();
    const pageNum = parseInt(pageInput);
    
    if (pageNum && pageNum > 0) {
      onPageChange(pageNum);
      setPageInput('');
      setShowPageInput(false);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const visiblePages = getVisiblePages();

  return (
    <footer className="flex flex-col items-center gap-3 py-4 bg-white border-t border-gray-200">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Page {currentPage}</span>
        {isLastPage && <span className="text-gray-500">(Last page)</span>}
      </div>
      
      <nav className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1 || isLoading}
          className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
            currentPage === 1 || isLoading
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              disabled={isLoading}
              className={`w-10 h-10 flex items-center justify-center rounded text-base font-medium transition-colors ${
                currentPage === page
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Go to Page Input */}
        {!showPageInput ? (
          <button
            onClick={() => setShowPageInput(true)}
            disabled={isLoading}
            className="px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Go to...
          </button>
        ) : (
          <form onSubmit={handlePageInputSubmit} className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              placeholder="Page #"
              className="w-20 px-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-500"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-2 bg-gray-900 text-white rounded text-sm hover:bg-gray-800 transition-colors"
            >
              Go
            </button>
            <button
              type="button"
              onClick={() => {
                setShowPageInput(false);
                setPageInput('');
              }}
              className="px-2 py-2 text-gray-600 hover:text-gray-800 text-sm"
            >
              ✕
            </button>
          </form>
        )}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={isLastPage || isLoading}
          className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
            isLastPage || isLoading
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          Next
        </button>
      </nav>
    </footer>
  );
};