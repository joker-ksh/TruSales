// src/hooks/useFilters.js

import { useState } from 'react';

export const useFilters = () => {
  // Multi-select filters (arrays)
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState([]);
  
  // Single-select filters (strings) - keep as before
  const [selectedAgeRange, setSelectedAgeRange] = useState('All');
  const [selectedDateRange, setSelectedDateRange] = useState('All');

  const filters = {
    region: selectedRegion,
    gender: selectedGender,
    ageRange: selectedAgeRange,
    category: selectedCategory,
    payment: selectedPayment,
    dateRange: selectedDateRange
  };

  const setters = {
    setSelectedRegion,
    setSelectedGender,
    setSelectedAgeRange,
    setSelectedCategory,
    setSelectedPayment,
    setSelectedDateRange
  };

  const resetFilters = () => {
    setSelectedRegion([]);
    setSelectedGender([]);
    setSelectedAgeRange('All');
    setSelectedCategory([]);
    setSelectedPayment([]);
    setSelectedDateRange('All');
  };

  return { filters, setters, resetFilters };
};