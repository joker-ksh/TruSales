// src/components/Header.jsx

import React from 'react';

export const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="px-[18px] py-3 bg-white border-b border-gray-200 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-black">
        Sales Management System
      </h1>
      <div className="w-[400px]">
        <input
          type="text"
          placeholder="Name, Phone no."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:border-gray-400 transition-colors text-sm text-gray-500 placeholder-gray-400"
        />
      </div>
    </header>
  );
};