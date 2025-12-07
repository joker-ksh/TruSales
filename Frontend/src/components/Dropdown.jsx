// src/components/Dropdown.jsx

import React from 'react';

export const Dropdown = ({ id, label, options, selected, onSelect, activeDropdown, setActiveDropdown }) => {
  const isOpen = activeDropdown === id;
  
  return (
    <div className="relative">
      <button
        onClick={() => setActiveDropdown(isOpen ? null : id)}
        className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors text-sm text-gray-700"
      >
        <span>{label}{selected !== 'All' ? `: ${selected}` : ''}</span>
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
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-20 min-w-[160px] max-h-[300px] overflow-y-auto">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onSelect(option);
                  setActiveDropdown(null);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                  selected === option ? 'bg-gray-50 font-medium' : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};