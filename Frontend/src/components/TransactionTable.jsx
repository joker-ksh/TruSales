// src/components/TransactionTable.jsx

import React from 'react';
import { TABLE_HEADERS } from '../utils/constants';

export const TransactionTable = ({ transactions }) => {
  return (
    <main className="flex-1 px-4 py-0 overflow-x-auto bg-gray-50">
      <div className="inline-block min-w-full">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              {TABLE_HEADERS.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-base font-medium text-gray-700 whitespace-nowrap border-b border-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4 text-base text-gray-700">{transaction.id}</td>
                  <td className="px-4 py-4 text-base text-gray-700 whitespace-nowrap">{transaction.date}</td>
                  <td className="px-4 py-4 text-base text-black font-semibold">{transaction.customerId}</td>
                  <td className="px-4 py-4 text-base text-black">{transaction.customerName}</td>
                  <td className="px-4 py-4 text-base text-gray-700 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span>{transaction.phone}</span>
                      <button className="hover:opacity-70">
                        <img
                          className="w-4 h-4"
                          alt="Copy"
                          src="https://c.animaapp.com/miuio6dnjIQft9/img/vuesax-linear-copy.svg"
                        />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-base text-black">{transaction.gender}</td>
                  <td className="px-4 py-4 text-base text-black">{transaction.age}</td>
                  <td className="px-4 py-4 text-base text-black font-semibold">{transaction.category}</td>
                  <td className="px-4 py-4 text-base text-black font-semibold">{transaction.quantity}</td>
                  <td className="px-4 py-4 text-base text-black font-semibold whitespace-nowrap">{transaction.amount}</td>
                  <td className="px-4 py-4 text-base text-black font-semibold">{transaction.region}</td>
                  <td className="px-4 py-4 text-base text-black font-semibold">{transaction.productId}</td>
                  <td className="px-4 py-4 text-base text-black font-semibold">{transaction.employee}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={13} className="px-4 py-8 text-center text-gray-500">
                  No transactions found matching your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};