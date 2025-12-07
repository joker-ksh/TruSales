import React, { useState, useMemo } from 'react';

export const Frame = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // Filter states
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedAgeRange, setSelectedAgeRange] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPayment, setSelectedPayment] = useState('All');
  const [selectedDateRange, setSelectedDateRange] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');

  // Sample data for 10 transactions
  const transactions = [
    {
      id: '1234567',
      date: '2023-09-26',
      customerId: 'CUST12016',
      customerName: 'Neha Yadav',
      phone: '+91 9123456789',
      gender: 'Female',
      age: 25,
      category: 'Clothing',
      quantity: '01',
      amount: '₹ 1,000',
      amountValue: 1000,
      region: 'South',
      productId: 'PROD0001',
      employee: 'Harsh Agrawal',
      paymentMethod: 'Credit Card'
    },
    {
      id: '1234568',
      date: '2023-09-27',
      customerId: 'CUST12017',
      customerName: 'Rahul Sharma',
      phone: '+91 9123456790',
      gender: 'Male',
      age: 32,
      category: 'Electronics',
      quantity: '02',
      amount: '₹ 25,000',
      amountValue: 25000,
      region: 'North',
      productId: 'PROD0002',
      employee: 'Priya Singh',
      paymentMethod: 'Debit Card'
    },
  ];

  const filterOptions = {
    region: ['All', 'North', 'South', 'East', 'West','Central'],
    gender: ['All', 'Male', 'Female'],
    ageRange: ['All', '18-25', '26-35', '36-45', '46+'],
    category: ['All', 'Clothing', 'Electronics', 'Beauty'],
    payment: ['All', 'Credit Card', 'Debit Card', 'Cash', 'UPI', 'Net Banking'],
    dateRange: ['All', 'Last 7 days', 'Last 30 days', 'Last 90 days']
  };

  const sortOptions = [
    { value: 'name-asc', label: 'Customer Name (A-Z)' },
    { value: 'name-desc', label: 'Customer Name (Z-A)' },
  ];

  const getAgeRange = (age) => {
    if (age >= 18 && age <= 25) return '18-25';
    if (age >= 26 && age <= 35) return '26-35';
    if (age >= 36 && age <= 45) return '36-45';
    return '46+';
  };

  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions.filter(t => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        t.customerName.toLowerCase().includes(searchLower) ||
        t.phone.includes(searchQuery);

      // Region filter
      const matchesRegion = selectedRegion === 'All' || t.region === selectedRegion;
      
      // Gender filter
      const matchesGender = selectedGender === 'All' || t.gender === selectedGender;
      
      // Age range filter
      const matchesAge = selectedAgeRange === 'All' || getAgeRange(t.age) === selectedAgeRange;
      
      // Category filter
      const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
      
      // Payment method filter
      const matchesPayment = selectedPayment === 'All' || t.paymentMethod === selectedPayment;

      return matchesSearch && matchesRegion && matchesGender && matchesAge && matchesCategory && matchesPayment;
    });

    // Sort
    filtered.sort((a, b) => {
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

    return filtered;
  }, [transactions, searchQuery, selectedRegion, selectedGender, selectedAgeRange, selectedCategory, selectedPayment, sortBy]);

  const tableHeaders = [
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

  const resetFilters = () => {
    setSelectedRegion('All');
    setSelectedGender('All');
    setSelectedAgeRange('All');
    setSelectedCategory('All');
    setSelectedPayment('All');
    setSelectedDateRange('All');
    setSearchQuery('');
  };

  const Dropdown = ({ id, label, options, selected, onSelect }) => {
    const isOpen = activeDropdown === id;
    
    return (
      <div className="relative">
        <button
          onClick={() => setActiveDropdown(isOpen ? null : id)}
          className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors text-sm text-gray-700"
        >
          <span>{label}{selected !== 'All' ? `: ${selected}` : ''}</span>
          <img
            className="w-4 h-4"
            alt="Arrow down"
            src="https://c.animaapp.com/miuio6dnjIQft9/img/vuesax-linear-arrow-down.svg"
          />
        </button>
        
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setActiveDropdown(null)}
            />
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-20 min-w-[160px] max-h-[300px] overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onSelect(option);
                    setActiveDropdown(null);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                    selected === option ? 'bg-gray-50 font-medium' : ''
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  const SortDropdown = () => {
    const isOpen = activeDropdown === 'sort';
    const currentSort = sortOptions.find(opt => opt.value === sortBy);
    
    return (
      <div className="relative">
        <button
          onClick={() => setActiveDropdown(isOpen ? null : 'sort')}
          className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 rounded text-sm text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <span>Sort by: {currentSort?.label}</span>
          <img
            className="w-4 h-4"
            alt="Arrow down"
            src="https://c.animaapp.com/miuio6dnjIQft9/img/vuesax-linear-arrow-down.svg"
          />
        </button>
        
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setActiveDropdown(null)}
            />
            <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-20 min-w-[200px]">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value);
                    setActiveDropdown(null);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                    sortBy === option.value ? 'bg-gray-50 font-medium' : ''
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full max-w-[1236px] mx-auto bg-white min-h-screen">
      {/* Header */}
      <header className="px-[18px] py-3 bg-white border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-black">
          Sales Management System
        </h1>
        <div className="w-[400px]">
          <input
            type="text"
            placeholder="Name, Phone no."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:border-gray-400 transition-colors text-sm text-gray-500 placeholder-gray-400"
          />
        </div>
      </header>

      {/* Filters and Sort Section */}
      <section className="px-5 py-4 bg-white flex items-center justify-between">
        <div className="inline-flex items-center gap-2.5">
          <button 
            onClick={resetFilters}
            className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            title="Reset filters"
          >
            <img
              className="w-4 h-4"
              alt="Reset filters"
              src="https://c.animaapp.com/miuio6dnjIQft9/img/vuesax-linear-rotate-left.svg"
            />
          </button>

          <Dropdown
            id="region"
            label="Customer Region"
            options={filterOptions.region}
            selected={selectedRegion}
            onSelect={setSelectedRegion}
          />
          
          <Dropdown
            id="gender"
            label="Gender"
            options={filterOptions.gender}
            selected={selectedGender}
            onSelect={setSelectedGender}
          />
          
          <Dropdown
            id="age"
            label="Age Range"
            options={filterOptions.ageRange}
            selected={selectedAgeRange}
            onSelect={setSelectedAgeRange}
          />
          
          <Dropdown
            id="category"
            label="Product Category"
            options={filterOptions.category}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
          
          <Dropdown
            id="payment"
            label="Payment Method"
            options={filterOptions.payment}
            selected={selectedPayment}
            onSelect={setSelectedPayment}
          />
          
          <Dropdown
            id="date"
            label="Date"
            options={filterOptions.dateRange}
            selected={selectedDateRange}
            onSelect={setSelectedDateRange}
          />
        </div>

        <SortDropdown />
      </section>

      {/* Stats Section */}
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
          <span className="text-sm font-semibold text-black">{filteredAndSortedTransactions.length}</span>
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
            ₹{filteredAndSortedTransactions.reduce((sum, t) => sum + t.amountValue, 0).toLocaleString('en-IN')}
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

      {/* Table Section */}
      <main className="flex-1 px-4 py-0 overflow-x-auto bg-gray-50">
        <div className="inline-block min-w-full">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                {tableHeaders.map((header, index) => (
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
              {filteredAndSortedTransactions.length > 0 ? (
                filteredAndSortedTransactions.map((transaction, index) => (
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

      {/* Pagination */}
      <footer className="flex flex-col items-center gap-3 py-3 bg-white border-t border-gray-200">
        <nav className="inline-flex items-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 flex items-center justify-center rounded text-base font-medium transition-colors ${
                currentPage === page
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
        </nav>
      </footer>
    </div>
  );
};  