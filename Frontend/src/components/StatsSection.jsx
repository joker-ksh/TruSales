// src/components/StatsSection.jsx

import React from 'react';

export const StatsSection = ({ transactions }) => {
  const totalAmount = transactions.reduce((sum, t) => sum + t.amountValue, 0);

  return (
    <section className="flex items-center gap-6 px-5 py-3 bg-white border-y border-gray-200">
      <div className="flex flex-col gap-1 px-4 py-2 border border-gray-200 rounded">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Total units sold</span>
          <button className="w-3.5 h-3.5 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
          </button>
        </div>
        <span className="text-sm font-semibold text-black">{transactions.length}</span>
      </div>
      
      <div className="flex flex-col gap-1 px-4 py-2 border border-gray-200 rounded">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Total Amount</span>
          <button className="w-3.5 h-3.5 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
          </button>
        </div>
        <span className="text-sm font-semibold text-black">
          ₹{totalAmount.toLocaleString('en-IN')}
        </span>
      </div>
      
      <div className="flex flex-col gap-1 px-4 py-2 border border-gray-200 rounded">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Total Discount</span>
          <button className="w-3.5 h-3.5 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
          </button>
        </div>
        <span className="text-sm font-semibold text-black">₹15000 (45 SRs)</span>
      </div>
    </section>
  );
};