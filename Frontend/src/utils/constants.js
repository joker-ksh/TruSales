// src/utils/constants.js

export const FILTER_OPTIONS = {
  region: ['All', 'North', 'South', 'East', 'West', 'Central'],
  gender: ['All', 'Male', 'Female'],
  ageRange: ['All', '18-25', '26-35', '36-45', '46+'],
  category: ['All', 'Clothing', 'Electronics', 'Beauty'],
  payment: ['All', 'Credit Card', 'Debit Card', 'Cash', 'UPI', 'Net Banking'],
  dateRange: ['All', 'Last 7 days', 'Last 30 days', 'Last 90 days']
};

export const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Customer Name (A-Z)' },
  { value: 'name-desc', label: 'Customer Name (Z-A)' },
  { value: 'amount-high', label: 'Amount (High to Low)' },
  { value: 'amount-low', label: 'Amount (Low to High)' },
  { value: 'date-new', label: 'Date (Newest First)' },
  { value: 'date-old', label: 'Date (Oldest First)' }
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