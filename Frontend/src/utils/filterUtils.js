// src/utils/filterUtils.js

export const getAgeRange = (age) => {
  if (age >= 18 && age <= 25) return '18-25';
  if (age >= 26 && age <= 35) return '26-35';
  if (age >= 36 && age <= 45) return '36-45';
  return '46+';
};

export const filterTransactions = (transactions, filters, searchQuery) => {
  return transactions.filter(t => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      t.customerName.toLowerCase().includes(searchLower) ||
      t.phone.includes(searchQuery);

    // Region filter
    const matchesRegion = filters.region === 'All' || t.region === filters.region;
    
    // Gender filter
    const matchesGender = filters.gender === 'All' || t.gender === filters.gender;
    
    // Age range filter
    const matchesAge = filters.ageRange === 'All' || getAgeRange(t.age) === filters.ageRange;
    
    // Category filter
    const matchesCategory = filters.category === 'All' || t.category === filters.category;
    
    // Payment method filter
    const matchesPayment = filters.payment === 'All' || t.paymentMethod === filters.payment;

    return matchesSearch && matchesRegion && matchesGender && matchesAge && matchesCategory && matchesPayment;
  });
};

export const sortTransactions = (transactions, sortBy) => {
  const sorted = [...transactions];
  
  sorted.sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.customerName.localeCompare(b.customerName);
      case 'name-desc':
        return b.customerName.localeCompare(a.customerName);
      case 'amount-high':
        return b.amountValue - a.amountValue;
      case 'amount-low':
        return a.amountValue - b.amountValue;
      case 'date-new':
        return new Date(b.date) - new Date(a.date);
      case 'date-old':
        return new Date(a.date) - new Date(b.date);
      default:
        return 0;
    }
  });

  return sorted;
};