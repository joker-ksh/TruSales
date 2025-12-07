// src/services/api.js

const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Fetch sales transactions from the backend
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search query
 * @param {number} params.page - Page number (1-based)
 * @param {string} params.sort - Sort field
 * @returns {Promise<Object>} Response with success, count, and data
 */
export const fetchSalesData = async ({ search = '', page = 1, sort = 'date' }) => {
  try {
    const params = new URLSearchParams();
    
    if (search) params.append('search', search);
    params.append('page', page.toString());
    if (sort) params.append('sort', sort);
    
    const url = `${API_BASE_URL}/sales?${params.toString()}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      success: data.success,
      count: data.count,
      data: data.data,
      currentPage: page,
      // If count < 10, it's the last page
      isLastPage: data.count < 10
    };
  } catch (error) {
    console.error('Error fetching sales data:', error);
    throw error;
  }
};

/**
 * Transform API data to match the existing structure
 * @param {Array} apiData - Data from API
 * @returns {Array} Transformed data
 */
export const transformApiData = (apiData) => {
  return apiData.map(item => ({
    id: item['Transaction ID'],
    date: item.Date,
    customerId: item['Customer ID'],
    customerName: item['Customer Name'],
    phone: item['Phone Number'],
    gender: item.Gender,
    age: item.Age,
    category: item['Product Category'],
    quantity: item.Quantity,
    amount: `₹ ${parseInt(item['Total Amount']).toLocaleString('en-IN')}`,
    amountValue: parseInt(item['Total Amount']),
    region: item['Customer Region'],
    productId: item['Product ID'],
    employee: item['Employee Name'],
    paymentMethod: item['Payment Method']
  }));
};