# TruSales Frontend Architecture Documentation

> **Frontend System Architecture for the Retail Sales Management System**

---

## Table of Contents

- [System Overview](#system-overview)
- [Technology Stack](#technology-stack)
- [Architecture Pattern](#architecture-pattern)
- [Core Components](#core-components)
- [State Management](#state-management)
- [Data Flow](#data-flow)
- [Folder Structure](#folder-structure)
- [Module Responsibilities](#module-responsibilities)
- [Performance Considerations](#performance-considerations)

---

## System Overview

The TruSales frontend is built with a **component-based architecture** using React, emphasizing unidirectional data flow, reusable components, and efficient state management. The application provides a responsive, interactive interface for searching, filtering, sorting, and viewing sales data with real-time updates and optimized user experience.

**Architecture Pattern:** Component-Based Architecture with Unidirectional Data Flow

**Key Design Principles:**
- Component reusability
- Single source of truth for state
- Declarative UI rendering
- Performance optimization through debouncing and memoization
- Responsive and accessible design

---

## Technology Stack

- **Library:** React 18+
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Fetch API
- **State Management:** React Hooks (useState, useEffect)
- **Routing:** N/A (Single Page Application without routing)
- **Development:** ESLint, PostCSS

---

## Architecture Pattern

### Component-Based Architecture

```
┌─────────────────────────────────────────┐
│              App Component              │
│         (Root & Global State)           │
└─────────────────┬───────────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
┌───────▼────────┐  ┌──────▼──────────┐
│    Header      │  │   Sidebar       │
│  (Search Bar)  │  │  (Navigation)   │
└───────┬────────┘  └─────────────────┘
        │
┌───────▼────────────────────────────────┐
│           Frame Component              │
│     (Main Content Container)           │
└───────┬────────────────────────────────┘
        │
        ├───────────────┬────────────────┐
        │               │                │
┌───────▼──────┐ ┌─────▼──────┐ ┌──────▼────────┐
│  FilterBar   │ │ SortDropdown│ │  StatsSection │
│  Component   │ │  Component  │ │   Component   │
└───────┬──────┘ └─────┬──────┘ └───────────────┘
        │               │
        └───────┬───────┘
                │
        ┌───────▼─────────┐
        │   API Service   │
        │ (Backend Calls) │
        └───────┬─────────┘
                │
        ┌───────▼──────────┐
        │ TransactionTable │
        │    Component     │
        └───────┬──────────┘
                │
        ┌───────▼──────────┐
        │   Pagination     │
        │    Component     │
        └──────────────────┘
```

### Unidirectional Data Flow

```
User Interaction
       ↓
Event Handler (onChange, onClick)
       ↓
State Update (setState)
       ↓
useEffect Triggered (dependency change)
       ↓
API Call (fetchSalesData)
       ↓
State Update with Response Data
       ↓
Component Re-render
       ↓
UI Updates
```

---

## Core Components

### 1. App Component (`App.jsx`)

**Responsibilities:**
- Root component of the application
- Renders Header, Sidebar, and Frame components
- Provides global layout structure

**Component Tree:**
```jsx
<App>
  <Header />
  <Sidebar />
  <Frame />
</App>
```

---

### 2. Frame Component (`Frame.jsx`)

**Responsibilities:**
- Main container for sales data functionality
- Manages all application state (search, filters, sort, pagination)
- Orchestrates child components
- Handles API communication
- Coordinates data flow between components

**State Variables:**
- `searchQuery` - Current search input from header
- `currentPage` - Current pagination page
- `sortBy` - Current sort configuration (e.g., "name-asc")
- `filters` - Active filter selections object
- `apiData` - Fetched sales records
- `isLoading` - Loading indicator
- `isLastPage` - Last page detection

**Key Functions:**
```javascript
// Fetch data from backend
const fetchData = async () => {
  setIsLoading(true);
  const [sortField, sortOrder] = sortBy.split('-');
  const response = await fetchSalesData({
    search: searchQuery,
    page: currentPage,
    sort: sortField,
    order: sortOrder,
    filters: filters
  });
  setApiData(response.data);
  setIsLoading(false);
  setIsLastPage(response.isLastPage);
};

// Handle search from header
const handleSearchChange = (query) => {
  setSearchQuery(query);
  setCurrentPage(1); // Reset to page 1
};

// Handle filter changes
const handleFilterChange = (filterName, value) => {
  setFilters(prev => ({ ...prev, [filterName]: value }));
  setCurrentPage(1); // Reset to page 1
};

// Handle sort changes
const handleSortChange = (newSortBy) => {
  setSortBy(newSortBy);
};

// Handle page navigation
const handlePageChange = (direction) => {
  if (direction === 'next' && !isLastPage) {
    setCurrentPage(prev => prev + 1);
  } else if (direction === 'prev' && currentPage > 1) {
    setCurrentPage(prev => prev - 1);
  }
};

// Reset all filters
const handleResetFilters = () => {
  setFilters({
    region: 'All',
    gender: 'All',
    ageRange: 'All',
    category: 'All',
    payment: 'All',
    dateRange: 'All'
  });
  setSearchQuery('');
  setSortBy('date-desc');
  setCurrentPage(1);
};
```

**useEffect Hook:**
```javascript
useEffect(() => {
  fetchData();
}, [
  searchQuery,
  currentPage,
  sortBy,
  filters.region,
  filters.gender,
  filters.ageRange,
  filters.category,
  filters.payment,
  filters.dateRange
]);
```

---

### 3. Header Component (`Header.jsx`)

**Responsibilities:**
- Render top navigation bar
- Provide search input field
- Handle user search input with debouncing
- Communicate search value to Frame component

**Props:**
- `onSearchChange` - Callback function for search updates

**Features:**
- **Debouncing:** 500ms delay to prevent excessive API calls
- **Clear Search:** Button to reset search query
- **Real-time Feedback:** Shows search query as user types

**Debouncing Implementation:**
```javascript
const Header = ({ onSearchChange }) => {
  const [localSearch, setLocalSearch] = useState('');
  const debounceTimer = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    // Set new timer
    debounceTimer.current = setTimeout(() => {
      onSearchChange(value);
    }, 500);
  };

  return (
    <input 
      type="text" 
      value={localSearch}
      onChange={handleChange}
      placeholder="Search by name or phone..."
    />
  );
};
```

---

### 4. Sidebar Component (`Sidebar.jsx`)

**Responsibilities:**
- Render left navigation sidebar
- Display navigation menu items
- Highlight active section
- Provide quick access to different views

**Features:**
- Navigation links
- Active state indication
- Responsive design for mobile

---

### 5. FilterBar Component (`FilterBar.jsx`)

**Responsibilities:**
- Render all filter options
- Handle multi-select filter selections
- Apply/Clear filter actions
- Communicate filter state to Frame

**Props:**
- `filters` - Current filter selections
- `onFilterChange` - Callback for individual filter updates
- `onApply` - Callback for apply filters action
- `onReset` - Callback for reset filters action

**Filter Types:**
```javascript
const filterOptions = {
  region: ['All', 'North', 'South', 'East', 'West'],
  gender: ['All', 'Male', 'Female', 'Other'],
  ageRange: ['All', '18-25', '26-35', '36-45', '46+'],
  category: ['All', 'Electronics', 'Clothing', 'Home', 'Sports'],
  payment: ['All', 'Cash', 'Credit Card', 'Debit Card', 'UPI']
};
```

**Component Structure:**
```jsx
<FilterBar>
  <Dropdown label="Region" options={regions} />
  <Dropdown label="Gender" options={genders} />
  <Dropdown label="Age Range" options={ageRanges} />
  <Dropdown label="Category" options={categories} />
  <Dropdown label="Payment" options={payments} />
  <Button onClick={handleApply}>Apply Filters</Button>
  <Button onClick={handleReset}>Reset</Button>
</FilterBar>
```

---

### 6. Dropdown Component (`Dropdown.jsx`)

**Responsibilities:**
- Reusable dropdown component
- Display selectable options
- Handle selection changes
- Show currently selected value

**Props:**
- `label` - Dropdown label text
- `options` - Array of selectable options
- `value` - Currently selected value
- `onChange` - Callback for selection changes

**Usage:**
```jsx
<Dropdown 
  label="Region"
  options={['All', 'North', 'South', 'East', 'West']}
  value={filters.region}
  onChange={(value) => onFilterChange('region', value)}
/>
```

---

### 7. SortDropdown Component (`SortDropdown.jsx`)

**Responsibilities:**
- Render sort options dropdown
- Handle sort field and order selection
- Communicate sort changes to Frame

**Props:**
- `sortBy` - Current sort configuration (e.g., "name-asc")
- `onSortChange` - Callback for sort updates

**Sort Options:**
```javascript
const sortOptions = [
  { label: 'Date (Newest First)', value: 'date-desc' },
  { label: 'Date (Oldest First)', value: 'date-asc' },
  { label: 'Quantity (Low to High)', value: 'quantity-asc' },
  { label: 'Quantity (High to Low)', value: 'quantity-desc' },
  { label: 'Name (A-Z)', value: 'name-asc' },
  { label: 'Name (Z-A)', value: 'name-desc' }
];
```

---

### 8. StatsSection Component (`StatsSection.jsx`)

**Responsibilities:**
- Display summary statistics
- Calculate totals from current data
- Show key metrics

**Props:**
- `data` - Current page sales data

**Displayed Metrics:**
- Total transactions (count)
- Total units sold (sum of quantities)
- Total revenue (sum of amounts)

**Calculation Logic:**
```javascript
const StatsSection = ({ data }) => {
  const totalTransactions = data.length;
  const totalUnits = data.reduce((sum, item) => sum + item.quantity, 0);
  const totalRevenue = data.reduce((sum, item) => sum + item.amountValue, 0);

  return (
    <div className="stats">
      <div>Total Transactions: {totalTransactions}</div>
      <div>Total Units: {totalUnits}</div>
      <div>Total Revenue: ₹{totalRevenue.toLocaleString()}</div>
    </div>
  );
};
```

---

### 9. TransactionTable Component (`TransactionTable.jsx`)

**Responsibilities:**
- Render sales data in table format
- Display all relevant fields
- Handle loading state
- Handle empty state (no results)
- Responsive table design

**Props:**
- `data` - Array of sales records
- `isLoading` - Loading indicator

**Displayed Columns:**
1. Transaction ID
2. Date
3. Customer Name
4. Phone Number
5. Gender
6. Age
7. Region
8. Product Category
9. Quantity
10. Total Amount
11. Payment Method
12. Employee Name

**States:**
```jsx
// Loading state
{isLoading && <LoadingSpinner />}

// Empty state
{!isLoading && data.length === 0 && (
  <EmptyState message="No transactions found" />
)}

// Data display
{!isLoading && data.length > 0 && (
  <table>
    <thead>...</thead>
    <tbody>
      {data.map(item => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.date}</td>
          ...
        </tr>
      ))}
    </tbody>
  </table>
)}
```

---

### 10. Pagination Component (`Pagination.jsx`)

**Responsibilities:**
- Render pagination controls
- Previous/Next buttons
- Current page indicator
- Handle page navigation
- Disable buttons at boundaries

**Props:**
- `currentPage` - Current page number
- `isLastPage` - Whether current page is the last page
- `onPageChange` - Callback for page navigation

**Button Logic:**
```jsx
<Pagination>
  <Button 
    onClick={() => onPageChange('prev')}
    disabled={currentPage === 1}
  >
    Previous
  </Button>
  
  <span>Page {currentPage}</span>
  
  <Button 
    onClick={() => onPageChange('next')}
    disabled={isLastPage}
  >
    Next
  </Button>
</Pagination>
```

**Last Page Detection:**
- Backend returns `count` of results
- If `count < 10`, frontend sets `isLastPage = true`
- Next button disabled when `isLastPage === true`

---

## State Management

### State Management Strategy

**Local Component State** using React Hooks:
- `useState` for component-level state
- `useEffect` for side effects and API calls
- State lifting for shared data
- Props drilling for component communication

### State Categories

**1. Search State**
```javascript
const [searchQuery, setSearchQuery] = useState('');
```
- Managed in Frame component
- Passed from Header via callback
- Triggers data refetch on change

**2. Filter State**
```javascript
const [filters, setFilters] = useState({
  region: 'All',
  gender: 'All',
  ageRange: 'All',
  category: 'All',
  payment: 'All',
  dateRange: 'All'
});
```
- Managed in Frame component
- Updated by FilterBar component
- Each filter change triggers refetch

**3. Sort State**
```javascript
const [sortBy, setSortBy] = useState('date-desc');
```
- Format: `{field}-{order}` (e.g., "name-asc")
- Parsed into sort field and order for API
- Maintains sort across operations

**4. Pagination State**
```javascript
const [currentPage, setCurrentPage] = useState(1);
const [isLastPage, setIsLastPage] = useState(false);
```
- Current page number
- Last page detection for navigation
- Reset to 1 on search/filter changes

**5. Data State**
```javascript
const [apiData, setApiData] = useState([]);
```
- Stores fetched sales records
- Updated after each successful API call
- Used by table and stats components

**6. Loading State**
```javascript
const [isLoading, setIsLoading] = useState(false);
```
- Indicates API request in progress
- Shows loading spinner in UI
- Prevents multiple simultaneous requests

**7. Error State**
```javascript
const [error, setError] = useState(null);
```
- Stores error messages from API failures
- Displays error notifications
- Can trigger retry mechanisms

### State Synchronization

**Query Parameters → Backend → Database → Response → Frontend State**

All search, filter, sort, and pagination states are:
1. Maintained in Frame component state
2. Encoded as URL query parameters in api.js
3. Sent to backend API
4. Used to build database aggregation pipeline
5. Results transformed and displayed

### State Persistence

**State Preservation Across Operations:**
- Searching resets page to 1 but maintains filters and sort
- Filtering resets page to 1 but maintains search and sort
- Sorting maintains all current search, filter, and page states
- Pagination maintains all query states

### State Reset Behaviors

```javascript
// Search change → Reset page
const handleSearchChange = (query) => {
  setSearchQuery(query);
  setCurrentPage(1); // ← Page reset
};

// Filter change → Page resets via dependency
useEffect(() => {
  setCurrentPage(1);
}, [filters.region, filters.gender, ...]); // Any filter change

// Complete reset
const handleResetFilters = () => {
  setFilters({
    region: 'All',
    gender: 'All',
    ageRange: 'All',
    category: 'All',
    payment: 'All',
    dateRange: 'All'
  });
  setSearchQuery('');
  setSortBy('date-desc');
  setCurrentPage(1);
};
```

---

## Data Flow

### Request Flow (User Action → UI Update)

```
1. User types "kabir" in Header search box
        ↓
2. handleChange() → debounce 500ms
        ↓
3. After delay, onSearchChange("kabir") called
        ↓
4. Frame: setSearchQuery("kabir")
        ↓
5. searchQuery state changes
        ↓
6. useEffect dependency triggers
   useEffect([searchQuery, currentPage, sortBy, filters...])
        ↓
7. fetchData() executes
   setIsLoading(true)
        ↓
8. Parse sortBy: "name-asc" → sort="name", order="asc"
        ↓
9. API call via fetchSalesData()
   await fetchSalesData({
     search: "kabir",
     page: 1,
     sort: "name",
     order: "asc",
     filters: { region: "North", gender: "All", ... }
   })
        ↓
10. Build URL in api.js
    GET /api/sales?search=kabir&page=1&sort=name&order=asc&region=North
        ↓
11. Backend processes request
    [MongoDB aggregation pipeline executed]
        ↓
12. Response received
    {
      success: true,
      count: 2,
      data: [...]
    }
        ↓
13. Transform data in api.js
    transformApiData(response.data)
    → [{ customerName: "Kabir Patel", phone: "9876543210", ... }]
        ↓
14. Frame updates state
    setApiData(transformedData)
    setIsLoading(false)
    setIsLastPage(response.count < 10)
        ↓
15. TransactionTable re-renders
    Display 2 rows in table
        ↓
16. StatsSection calculates
    Total: 2 transactions
    Total units: sum of quantities
    Total amount: sum of amounts
```

### useEffect Dependencies

```javascript
useEffect(() => {
  fetchData();
}, [
  searchQuery,           // Search changes trigger refetch
  currentPage,           // Page changes trigger refetch
  sortBy,                // Sort changes trigger refetch
  filters.region,        // Each filter change triggers refetch
  filters.gender,
  filters.ageRange,
  filters.category,
  filters.payment,
  filters.dateRange
]);
```

**Dependency Management:**
- Any dependency change triggers `fetchData()`
- Prevents unnecessary API calls when dependencies unchanged
- Ensures UI always reflects current state

---

## Folder Structure

```
Frontend/
│
├── public/
│   └── vite.svg                   # Vite logo
│
├── src/
│   │
│   ├── components/
│   │   ├── Dropdown.jsx           # Reusable dropdown component
│   │   ├── FilterBar.jsx          # Filter options container
│   │   ├── Frame.jsx              # Main container component
│   │   ├── Header.jsx             # Header with search
│   │   ├── Pagination.jsx         # Pagination controls
│   │   ├── Sidebar.jsx            # Left sidebar navigation
│   │   ├── SortDropdown.jsx       # Sort options dropdown
│   │   ├── StatsSection.jsx       # Statistics display
│   │   └── TransactionTable.jsx   # Data table component
│   │
│   ├── hooks/
│   │   └── useFilters.js          # Custom hook for filter state
│   │
│   ├── services/
│   │   ├── api.js                 # API calls and HTTP client
│   │   └── mockData.js            # Mock data for development
│   │
│   ├── utils/
│   │   ├── constants.js           # App-wide constants
│   │   └── filterUtils.js         # Filter helper functions
│   │
│   ├── App.jsx                    # Root component
│   ├── App.css                    # Global styles
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Tailwind imports
│
├── .env                           # Environment variables
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies and scripts
├── package-lock.json              # Dependency lock file
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
├── eslint.config.js               # ESLint configuration
└── index.html                     # HTML entry point
```

---

## Module Responsibilities

### Components Directory

**Purpose:** Contains all React components for the application

---

### Hooks Directory (`hooks/useFilters.js`)

**Custom Hook: useFilters**

**Responsibilities:**
- Centralize filter state management
- Provide filter values and setters
- Reset functionality

**Returns:**
```javascript
{
  filters: {
    selectedRegion,
    selectedGender,
    selectedAgeRange,
    selectedCategory,
    selectedPayment,
    selectedDateRange
  },
  setters: {
    setSelectedRegion,
    setSelectedGender,
    setSelectedAgeRange,
    setSelectedCategory,
    setSelectedPayment,
    setSelectedDateRange
  },
  resetFilters: () => { /* reset all to 'All' */ }
}
```

---

### Services Directory

#### API Service (`services/api.js`)

**Responsibilities:**
- Centralize all API calls
- Build query parameter strings
- Transform API response data
- Handle network errors

**Key Functions:**

**1. fetchSalesData(params)**
```javascript
const fetchSalesData = async ({
  search = '',
  page = 1,
  sort = '',
  order = 'desc',
  filters = {}
}) => {
  const params = new URLSearchParams();
  
  // Add parameters only if they have values
  if (search) params.append('search', search);
  if (page && page > 1) params.append('page', page);
  if (sort) params.append('sort', sort);
  if (order) params.append('order', order);
  
  // Add filter parameters (skip if 'All')
  if (filters.region && filters.region !== 'All') {
    params.append('region', filters.region);
  }
  if (filters.gender && filters.gender !== 'All') {
    params.append('gender', filters.gender);
  }
  // ... other filters
  
  const response = await fetch(`${API_URL}/sales?${params}`);
  const data = await response.json();
  
  return {
    success: data.success,
    count: data.count,
    data: transformApiData(data.data),
    currentPage: page,
    isLastPage: data.count < 10
  };
};
```

**Parameter Building Logic:**
- Conditional parameter addition
- Only adds non-empty values
- Skips "All" filter values
- Handles pagination default (page 1)

**2. transformApiData(apiData)**
```javascript
const transformApiData = (apiData) => {
  return apiData.map(item => ({
    id: item['Transaction ID'],
    date: item['Date'],
    customerId: item['Customer ID'],
    customerName: item['Customer Name'],
    phone: item['Phone Number'],
    gender: item['Gender'],
    age: item['Age'],
    region: item['Customer Region'],
    productId: item['Product ID'],
    category: item['Product Category'],
    quantity: item['Quantity'],
    amount: `₹${Number(item['Total Amount']).toLocaleString()}`,
    amountValue: Number(item['Total Amount']),
    payment: item['Payment Method'],
    employee: item['Employee Name']
  }));
};
```

**Data Transformation:**
- Converts backend field names to frontend camelCase
- Formats amounts with ₹ symbol and locale
- Extracts numeric value for calculations
- Maps all 13 fields properly

#### Mock Data Service (`services/mockData.js`)

**Responsibilities:**
- Provide sample data for development
- Testing without backend
- Component development in isolation

---

### Utils Directory

**1. Constants (`utils/constants.js`)**

**Responsibilities:**
- Store app-wide constants
- Filter options arrays
- Sort configurations
- Table headers
- Default states

**Exports:**
```javascript
export const FILTER_OPTIONS = {
  regions: ['All', 'North', 'South', 'East', 'West'],
  genders: ['All', 'Male', 'Female', 'Other'],
  ageRanges: ['All', '18-25', '26-35', '36-45', '46+'],
  categories: ['All', 'Electronics', 'Clothing', 'Home', 'Sports'],
  payments: ['All', 'Cash', 'Credit Card', 'Debit Card', 'UPI']
};

export const SORT_OPTIONS = [
  { label: 'Date (Newest)', value: 'date-desc' },
  { label: 'Date (Oldest)', value: 'date-asc' },
  // ...
];

export const TABLE_HEADERS = [
  'Transaction ID',
  'Date',
  'Customer Name',
  // ...
];

export const DEFAULT_FILTER_STATE = {
  region: 'All',
  gender: 'All',
  ageRange: 'All',
  category: 'All',
  payment: 'All',
  dateRange: 'All'
};
```

**2. Filter Utils (`utils/filterUtils.js`)**

**Responsibilities:**
- Filter helper functions
- Client-side filtering logic (not used with backend API)
- Sort helper functions (not used with backend API)

**Note:** These utilities are present for potential client-side operations but are not actively used since all filtering and sorting happens on the backend.

---

## Performance Considerations

### Frontend Optimizations

**1. Debouncing**
```javascript
// Search input debouncing to reduce API calls
const debounceTimer = useRef(null);

const handleChange = (e) => {
  const value = e.target.value;
  setLocalSearch(value);
  
  if (debounceTimer.current) {
    clearTimeout(debounceTimer.current);
  }
  
  debounceTimer.current = setTimeout(() => {
    onSearchChange(value);
  }, 500); // 500ms delay
};
```
- Prevents excessive API calls during typing
- 500ms delay after user stops typing
- Improves server load and user experience

**2. Memoization**
```javascript
// Memoize expensive calculations
const totalRevenue = useMemo(() => {
  return apiData.reduce((sum, item) => sum + item.amountValue, 0);
}, [apiData]);
```
- Cache computed values
- Recalculate only when dependencies change
- Reduces unnecessary computations

**3. Conditional Rendering**
```javascript
// Only render when data is available
{!isLoading && apiData.length > 0 && (
  <TransactionTable data={apiData} />
)}
```
- Avoid rendering empty components
- Show appropriate states (loading, empty, error)
- Improves perceived performance

---

**Last Updated:** December 2025
**Version:** 1.0