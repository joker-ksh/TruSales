// import React, { useState } from 'react';

// export const Frame = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);

//   // Sample data for 10 transactions
//   const transactions = [
//     {
//       id: '1234567',
//       date: '2023-09-26',
//       customerId: 'CUST12016',
//       customerName: 'Neha Yadav',
//       phone: '+91 9123456789',
//       gender: 'Female',
//       age: 25,
//       category: 'Clothing',
//       quantity: '01',
//       amount: '₹ 1,000',
//       region: 'South',
//       productId: 'PROD0001',
//       employee: 'Harsh Agrawal'
//     },
//     {
//       id: '1234568',
//       date: '2023-09-27',
//       customerId: 'CUST12017',
//       customerName: 'Rahul Sharma',
//       phone: '+91 9123456790',
//       gender: 'Male',
//       age: 32,
//       category: 'Electronics',
//       quantity: '02',
//       amount: '₹ 25,000',
//       region: 'North',
//       productId: 'PROD0002',
//       employee: 'Priya Singh'
//     },
//     {
//       id: '1234569',
//       date: '2023-09-28',
//       customerId: 'CUST12018',
//       customerName: 'Anita Desai',
//       phone: '+91 9123456791',
//       gender: 'Female',
//       age: 28,
//       category: 'Home Decor',
//       quantity: '03',
//       amount: '₹ 5,500',
//       region: 'West',
//       productId: 'PROD0003',
//       employee: 'Amit Patel'
//     },
//     {
//       id: '1234570',
//       date: '2023-09-29',
//       customerId: 'CUST12019',
//       customerName: 'Vikram Singh',
//       phone: '+91 9123456792',
//       gender: 'Male',
//       age: 45,
//       category: 'Furniture',
//       quantity: '01',
//       amount: '₹ 15,000',
//       region: 'East',
//       productId: 'PROD0004',
//       employee: 'Sneha Reddy'
//     },
//     {
//       id: '1234571',
//       date: '2023-09-30',
//       customerId: 'CUST12020',
//       customerName: 'Pooja Mehta',
//       phone: '+91 9123456793',
//       gender: 'Female',
//       age: 30,
//       category: 'Clothing',
//       quantity: '05',
//       amount: '₹ 8,000',
//       region: 'South',
//       productId: 'PROD0005',
//       employee: 'Harsh Agrawal'
//     },
//     {
//       id: '1234572',
//       date: '2023-10-01',
//       customerId: 'CUST12021',
//       customerName: 'Arjun Kumar',
//       phone: '+91 9123456794',
//       gender: 'Male',
//       age: 27,
//       category: 'Electronics',
//       quantity: '01',
//       amount: '₹ 45,000',
//       region: 'North',
//       productId: 'PROD0006',
//       employee: 'Priya Singh'
//     },
//     {
//       id: '1234573',
//       date: '2023-10-02',
//       customerId: 'CUST12022',
//       customerName: 'Divya Iyer',
//       phone: '+91 9123456795',
//       gender: 'Female',
//       age: 35,
//       category: 'Jewelry',
//       quantity: '02',
//       amount: '₹ 30,000',
//       region: 'South',
//       productId: 'PROD0007',
//       employee: 'Amit Patel'
//     },
//     {
//       id: '1234574',
//       date: '2023-10-03',
//       customerId: 'CUST12023',
//       customerName: 'Ravi Verma',
//       phone: '+91 9123456796',
//       gender: 'Male',
//       age: 40,
//       category: 'Sports',
//       quantity: '04',
//       amount: '₹ 12,000',
//       region: 'West',
//       productId: 'PROD0008',
//       employee: 'Sneha Reddy'
//     },
//     {
//       id: '1234575',
//       date: '2023-10-04',
//       customerId: 'CUST12024',
//       customerName: 'Kavita Nair',
//       phone: '+91 9123456797',
//       gender: 'Female',
//       age: 29,
//       category: 'Books',
//       quantity: '10',
//       amount: '₹ 3,500',
//       region: 'East',
//       productId: 'PROD0009',
//       employee: 'Harsh Agrawal'
//     },
//     {
//       id: '1234576',
//       date: '2023-10-05',
//       customerId: 'CUST12025',
//       customerName: 'Sanjay Gupta',
//       phone: '+91 9123456798',
//       gender: 'Male',
//       age: 38,
//       category: 'Electronics',
//       quantity: '01',
//       amount: '₹ 35,000',
//       region: 'North',
//       productId: 'PROD0010',
//       employee: 'Priya Singh'
//     }
//   ];

//   const filters = [
//     'Customer Region',
//     'Gender',
//     'Age Range',
//     'Product Category',
//     'Tags',
//     'Payment Method',
//     'Date'
//   ];

//   const tableHeaders = [
//     'Transaction ID',
//     'Date',
//     'Customer ID',
//     'Customer name',
//     'Phone Number',
//     'Gender',
//     'Age',
//     'Product Category',
//     'Quantity',
//     'Total Amount',
//     'Customer region',
//     'Product ID',
//     'Employee name'
//   ];

//   return (
//     <div className="flex flex-col w-full max-w-[1236px] mx-auto bg-white min-h-screen">
//       {/* Header */}
//       <header className="px-[18px] py-3 bg-white border-b border-gray-200 flex items-center justify-between">
//         <h1 className="text-2xl font-semibold text-black">
//           Sales Management System
//         </h1>
//         <div className="w-[400px]">
//           <input
//             type="text"
//             placeholder="Name, Phone no."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:border-gray-400 transition-colors text-sm text-gray-500 placeholder-gray-400"
//           />
//         </div>
//       </header>

//       {/* Filters and Sort Section */}
//       <section className="px-5 py-4 bg-white flex items-center justify-between">
//         <div className="inline-flex items-center gap-2.5">
//           <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
//             <img
//               className="w-4 h-4"
//               alt="Rotate left"
//               src="https://c.animaapp.com/miuio6dnjIQft9/img/vuesax-linear-rotate-left.svg"
//             />
//           </button>

//           {filters.map((filter, index) => (
//             <button
//               key={index}
//               className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors text-sm text-gray-700"
//             >
//               <span>{filter}</span>
//               <img
//                 className="w-4 h-4"
//                 alt="Arrow down"
//                 src="https://c.animaapp.com/miuio6dnjIQft9/img/vuesax-linear-arrow-down.svg"
//               />
//             </button>
//           ))}
//         </div>

//         <div className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 rounded text-sm text-gray-700">
//           <span>Sort by: Customer Name (A-Z)</span>
//           <img
//             className="w-4 h-4"
//             alt="Arrow down"
//             src="https://c.animaapp.com/miuio6dnjIQft9/img/vuesax-linear-arrow-down.svg"
//           />
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="flex items-center gap-6 px-5 py-3 bg-white border-y border-gray-200">
//         <div className="flex flex-col gap-1 px-4 py-2 border border-gray-200 rounded">
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-gray-600">Total units sold</span>
//             <button className="w-3.5 h-3.5 flex items-center justify-center">
//               <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <circle cx="12" cy="12" r="10"/>
//                 <path d="M12 16v-4M12 8h.01"/>
//               </svg>
//             </button>
//           </div>
//           <span className="text-sm font-semibold text-black">10</span>
//         </div>
        
//         <div className="flex flex-col gap-1 px-4 py-2 border border-gray-200 rounded">
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-gray-600">Total Amount</span>
//             <button className="w-3.5 h-3.5 flex items-center justify-center">
//               <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <circle cx="12" cy="12" r="10"/>
//                 <path d="M12 16v-4M12 8h.01"/>
//               </svg>
//             </button>
//           </div>
//           <span className="text-sm font-semibold text-black">₹89,000 (19 SRs)</span>
//         </div>
        
//         <div className="flex flex-col gap-1 px-4 py-2 border border-gray-200 rounded">
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-gray-600">Total Discount</span>
//             <button className="w-3.5 h-3.5 flex items-center justify-center">
//               <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <circle cx="12" cy="12" r="10"/>
//                 <path d="M12 16v-4M12 8h.01"/>
//               </svg>
//             </button>
//           </div>
//           <span className="text-sm font-semibold text-black">₹15000 (45 SRs)</span>
//         </div>
//       </section>

//       {/* Table Section */}
//       <main className="flex-1 px-4 py-0 overflow-x-auto bg-gray-50">
//         <div className="inline-block min-w-full">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr className="bg-gray-100">
//                 {tableHeaders.map((header, index) => (
//                   <th
//                     key={index}
//                     className="px-4 py-3 text-left text-base font-medium text-gray-700 whitespace-nowrap border-b border-gray-200"
//                   >
//                     {header}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {transactions.map((transaction, index) => (
//                 <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
//                   <td className="px-4 py-4 text-base text-gray-700">{transaction.id}</td>
//                   <td className="px-4 py-4 text-base text-gray-700 whitespace-nowrap">{transaction.date}</td>
//                   <td className="px-4 py-4 text-base text-black font-semibold">{transaction.customerId}</td>
//                   <td className="px-4 py-4 text-base text-black">{transaction.customerName}</td>
//                   <td className="px-4 py-4 text-base text-gray-700 whitespace-nowrap">
//                     <div className="flex items-center gap-2">
//                       <span>{transaction.phone}</span>
//                       <button className="hover:opacity-70">
//                         <img
//                           className="w-4 h-4"
//                           alt="Copy"
//                           src="https://c.animaapp.com/miuio6dnjIQft9/img/vuesax-linear-copy.svg"
//                         />
//                       </button>
//                     </div>
//                   </td>
//                   <td className="px-4 py-4 text-base text-black">{transaction.gender}</td>
//                   <td className="px-4 py-4 text-base text-black">{transaction.age}</td>
//                   <td className="px-4 py-4 text-base text-black font-semibold">{transaction.category}</td>
//                   <td className="px-4 py-4 text-base text-black font-semibold">{transaction.quantity}</td>
//                   <td className="px-4 py-4 text-base text-black font-semibold whitespace-nowrap">{transaction.amount}</td>
//                   <td className="px-4 py-4 text-base text-black font-semibold">{transaction.region}</td>
//                   <td className="px-4 py-4 text-base text-black font-semibold">{transaction.productId}</td>
//                   <td className="px-4 py-4 text-base text-black font-semibold">{transaction.employee}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>

//       {/* Pagination */}
//       <footer className="flex flex-col items-center gap-3 py-3 bg-white border-t border-gray-200">
//         <nav className="inline-flex items-center gap-2">
//           {[1, 2, 3, 4, 5, 6].map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               className={`w-8 h-8 flex items-center justify-center rounded text-base font-medium transition-colors ${
//                 currentPage === page
//                   ? 'bg-gray-900 text-white'
//                   : 'bg-white text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               {page}
//             </button>
//           ))}
//         </nav>
//       </footer>
//     </div>
//   );
// };



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
    {
      id: '1234569',
      date: '2023-09-28',
      customerId: 'CUST12018',
      customerName: 'Anita Desai',
      phone: '+91 9123456791',
      gender: 'Female',
      age: 28,
      category: 'Home Decor',
      quantity: '03',
      amount: '₹ 5,500',
      amountValue: 5500,
      region: 'West',
      productId: 'PROD0003',
      employee: 'Amit Patel',
      paymentMethod: 'Cash'
    },
    {
      id: '1234570',
      date: '2023-09-29',
      customerId: 'CUST12019',
      customerName: 'Vikram Singh',
      phone: '+91 9123456792',
      gender: 'Male',
      age: 45,
      category: 'Furniture',
      quantity: '01',
      amount: '₹ 15,000',
      amountValue: 15000,
      region: 'East',
      productId: 'PROD0004',
      employee: 'Sneha Reddy',
      paymentMethod: 'UPI'
    },
    {
      id: '1234571',
      date: '2023-09-30',
      customerId: 'CUST12020',
      customerName: 'Pooja Mehta',
      phone: '+91 9123456793',
      gender: 'Female',
      age: 30,
      category: 'Clothing',
      quantity: '05',
      amount: '₹ 8,000',
      amountValue: 8000,
      region: 'South',
      productId: 'PROD0005',
      employee: 'Harsh Agrawal',
      paymentMethod: 'Credit Card'
    },
    {
      id: '1234572',
      date: '2023-10-01',
      customerId: 'CUST12021',
      customerName: 'Arjun Kumar',
      phone: '+91 9123456794',
      gender: 'Male',
      age: 27,
      category: 'Electronics',
      quantity: '01',
      amount: '₹ 45,000',
      amountValue: 45000,
      region: 'North',
      productId: 'PROD0006',
      employee: 'Priya Singh',
      paymentMethod: 'Debit Card'
    },
    {
      id: '1234573',
      date: '2023-10-02',
      customerId: 'CUST12022',
      customerName: 'Divya Iyer',
      phone: '+91 9123456795',
      gender: 'Female',
      age: 35,
      category: 'Jewelry',
      quantity: '02',
      amount: '₹ 30,000',
      amountValue: 30000,
      region: 'South',
      productId: 'PROD0007',
      employee: 'Amit Patel',
      paymentMethod: 'Cash'
    },
    {
      id: '1234574',
      date: '2023-10-03',
      customerId: 'CUST12023',
      customerName: 'Ravi Verma',
      phone: '+91 9123456796',
      gender: 'Male',
      age: 40,
      category: 'Sports',
      quantity: '04',
      amount: '₹ 12,000',
      amountValue: 12000,
      region: 'West',
      productId: 'PROD0008',
      employee: 'Sneha Reddy',
      paymentMethod: 'UPI'
    },
    {
      id: '1234575',
      date: '2023-10-04',
      customerId: 'CUST12024',
      customerName: 'Kavita Nair',
      phone: '+91 9123456797',
      gender: 'Female',
      age: 29,
      category: 'Books',
      quantity: '10',
      amount: '₹ 3,500',
      amountValue: 3500,
      region: 'East',
      productId: 'PROD0009',
      employee: 'Harsh Agrawal',
      paymentMethod: 'Credit Card'
    },
    {
      id: '1234576',
      date: '2023-10-05',
      customerId: 'CUST12025',
      customerName: 'Sanjay Gupta',
      phone: '+91 9523456798',
      gender: 'Male',
      age: 38,
      category: 'Electronics',
      quantity: '01',
      amount: '₹ 35,000',
      amountValue: 35000,
      region: 'North',
      productId: 'PROD0010',
      employee: 'Priya Singh',
      paymentMethod: 'Debit Card'
    }
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