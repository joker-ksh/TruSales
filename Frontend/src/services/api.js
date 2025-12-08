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
    // Build URL manually to avoid URLSearchParams encoding issues
    const queryParts = [];
    
    // Only add parameters if they have values
    if (search && search.trim()) {
      queryParts.push(`search=${encodeURIComponent(search)}`);
    }
    
    if (page && page > 1) {
      queryParts.push(`page=${page}`);
    }
    
    if (sort && sort.trim()) {
      queryParts.push(`sort=${sort}`);
    }
    
    if (order && order.trim()) {
      queryParts.push(`order=${order}`);
    }
    
    // Multi-select filters - send as comma-separated strings
    if (filters.region && Array.isArray(filters.region) && filters.region.length > 0) {
      queryParts.push(`region=${filters.region.join(',')}`);
    }
    
    if (filters.gender && Array.isArray(filters.gender) && filters.gender.length > 0) {
      queryParts.push(`gender=${filters.gender.join(',')}`);
    }
    
    if (filters.category && Array.isArray(filters.category) && filters.category.length > 0) {
      queryParts.push(`category=${filters.category.join(',')}`);
    }
    
    if (filters.payment && Array.isArray(filters.payment) && filters.payment.length > 0) {
      // Don't encode spaces in payment methods - backend expects "Credit Card" not "Credit%20Card"
      queryParts.push(`payment=${filters.payment.join(',')}`);
    }
    
    // Age range filter - send as-is to backend
    if (filters.ageRange && filters.ageRange !== 'All' && filters.ageRange.trim()) {
      queryParts.push(`age=${filters.ageRange}`);
    }
    
    // Date range filter
    if (filters.dateRange && filters.dateRange !== 'All' && filters.dateRange.trim()) {
      queryParts.push(`date=${filters.dateRange}`);
    }
    
    const queryString = queryParts.join('&');
    const url = queryString 
      ? `${API_BASE_URL}/sales?${queryString}`
      : `${API_BASE_URL}/sales`;
    
    console.log('Fetching URL:', url);
    
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