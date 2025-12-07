// src/hooks/useFilters.js

import { useState } from 'react';
import { DEFAULT_FILTER_STATE } from '../utils/constants';

export const useFilters = () => {
  const [selectedRegion, setSelectedRegion] = useState(DEFAULT_FILTER_STATE.region);
  const [selectedGender, setSelectedGender] = useState(DEFAULT_FILTER_STATE.gender);
  const [selectedAgeRange, setSelectedAgeRange] = useState(DEFAULT_FILTER_STATE.ageRange);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_FILTER_STATE.category);
  const [selectedPayment, setSelectedPayment] = useState(DEFAULT_FILTER_STATE.payment);
  const [selectedDateRange, setSelectedDateRange] = useState(DEFAULT_FILTER_STATE.dateRange);

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
    setSelectedRegion(DEFAULT_FILTER_STATE.region);
    setSelectedGender(DEFAULT_FILTER_STATE.gender);
    setSelectedAgeRange(DEFAULT_FILTER_STATE.ageRange);
    setSelectedCategory(DEFAULT_FILTER_STATE.category);
    setSelectedPayment(DEFAULT_FILTER_STATE.payment);
    setSelectedDateRange(DEFAULT_FILTER_STATE.dateRange);
  };

  return { filters, setters, resetFilters };
};