// src/components/Pagination.jsx

import React from 'react';

export const Pagination = ({ currentPage, setCurrentPage }) => {
  return (
    <footer className="flex flex-col items-center gap-3 py-3 bg-white border-t border-gray-200">
      <nav className="inline-flex items-center gap-2">
        {[1, 2, 3, 4, 5, 6].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 flex items-center justify-center rounded text-base font-medium transition-colors ${
              currentPage === page
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
      </nav>
    </footer>
  );
};