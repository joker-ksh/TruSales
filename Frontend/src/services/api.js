// src/services/api.js

const API_BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Fetch sales transactions from the backend
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search query
 * @param {number} params.page - Page number (1-based)
 * @param {string} params.sort - Sort field (name, date, quantity)
 * @param {string} params.order - Sort order (asc, desc)
 * @param {Object} params.filters - Filter object
 * @returns {Promise<Object>} Response with success, count, and data
 */
export const fetchSalesData = async ({ 
  search = '', 
  page = null, 
  sort = null,
  order = null,
  filters = {}
}) => {
  try {
    const params = new URLSearchParams();
    
    // Only add parameters if they have values
    if (search) params.append('search', search);
    if (page && page > 1) params.append('page', page.toString());
    if (sort) params.append('sort', sort);
    if (order) params.append('order', order);
    
    // Add filter parameters
    if (filters.region && filters.region !== 'All') {
      params.append('region', filters.region);
    }
    if (filters.gender && filters.gender !== 'All') {
      params.append('gender', filters.gender);
    }
    if (filters.category && filters.category !== 'All') {
      params.append('category', filters.category);
    }
    if (filters.payment && filters.payment !== 'All') {
      params.append('payment', filters.payment);
    }
    // Note: ageRange and dateRange might need special handling based on your backend
    
    const queryString = params.toString();
    const url = queryString 
      ? `${API_BASE_URL}/sales?${queryString}`
      : `${API_BASE_URL}/sales`;
    
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