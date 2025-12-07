// src/utils/constants.js

export const FILTER_OPTIONS = {
  region: ['All', 'North', 'South', 'East', 'West', 'Central'],
  gender: ['All', 'Male', 'Female'],
  ageRange: ['All', '18-25', '26-35', '36-45', '46+'],
  category: ['All', 'Clothing', 'Electronics', 'Beauty'],
  payment: ['All', 'Credit Card', 'Debit Card', 'Cash', 'UPI', 'Net Banking'],
  dateRange: ['All']
};

export const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Customer Name (A-Z)' },
  { value: 'name-desc', label: 'Customer Name (Z-A)' },
  { value: 'date-asc', label: 'Date (Oldest First)' },
  { value: 'date-desc', label: 'Date (Newest First)' },
  { value: 'quantity-asc', label: 'Quantity (Low to High)' },
  { value: 'quantity-desc', label: 'Quantity (High to Low)' }
];

export const API_BASE_URL = 'http://localhost:3000/api';

export const TABLE_HEADERS = [
  'Transaction ID',
  'Date',
  'Customer ID',
  'Customer name',
  'Phone Number',
  'Gender',
  'Age',
  'Product Category',
  'Quantity',
  'Total Amount',
  'Customer region',
  'Product ID',
  'Employee name'
];

export const DEFAULT_FILTER_STATE = {
  region: 'All',
  gender: 'All',
  ageRange: 'All',
  category: 'All',
  payment: 'All',
  dateRange: 'All'
};