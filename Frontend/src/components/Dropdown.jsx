// src/components/Dropdown.jsx

import React from 'react';

export const Dropdown = ({ id, label, options, selected, onSelect, activeDropdown, setActiveDropdown, multiSelect = false }) => {
  const isOpen = activeDropdown === id;
  
  const handleOptionClick = (option) => {
    if (multiSelect) {
      // Multi-select logic
      if (option === 'All') {
        onSelect([]);
        return;
      }
      
      if (selected.includes(option)) {
        // Remove option
        onSelect(selected.filter(item => item !== option));
      } else {
        // Add option
        onSelect([...selected, option]);
      }
    } else {
      // Single-select logic
      onSelect(option);
      setActiveDropdown(null);
    }
  };
  
  // Get display text
  const getDisplayText = () => {
    if (multiSelect) {
      if (selected.length === 0) {
        return '';
      }
      if (selected.length === 1) {
        return `: ${selected[0]}`;
      }
      return `: ${selected.length} selected`;
    } else {
      return selected !== 'All' ? `: ${selected}` : '';
    }
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setActiveDropdown(isOpen ? null : id)}
        className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors text-sm text-gray-700"
      >
        <span>{label}{getDisplayText()}</span>
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
            {options.map((option) => {
              const isSelected = multiSelect 
                ? (option === 'All' ? selected.length === 0 : selected.includes(option))
                : selected === option;
              
              return (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center gap-2 ${
                    isSelected ? 'bg-gray-50' : ''
                  }`}
                >
                  {multiSelect && (
                    <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                      isSelected ? 'border-gray-900 bg-gray-900' : 'border-gray-400'
                    }`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  )}
                  <span className={isSelected && !multiSelect ? 'font-medium' : ''}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};