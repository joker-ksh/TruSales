# TruSales Backend Architecture Documentation

> **Backend System Architecture for the Retail Sales Management System**

---

## Table of Contents

- [System Overview](#system-overview)
- [Technology Stack](#technology-stack)
- [Architecture Layers](#architecture-layers)
- [Core Components](#core-components)
- [Database Query Strategy](#database-query-strategy)
- [Folder Structure](#folder-structure)
- [Module Responsibilities](#module-responsibilities)
- [Data Flow](#data-flow)
- [Performance Considerations](#performance-considerations)
- [Scalability Considerations](#scalability-considerations)

---

## System Overview

The TruSales backend follows a **layered RESTful architecture** with clear separation of concerns across Router, Controller, Service, and Model layers. Built on the Node.js runtime with Express.js framework and MongoDB database, the system emphasizes scalability, maintainability, and efficient database querying through MongoDB's aggregation pipeline.

**Architecture Pattern:** RESTful API with MongoDB Aggregation Pipeline

**Key Design Principles:**
- Separation of concerns
- Single responsibility principle
- Efficient database querying
- Stateless API design
- Query optimization strategies

---

## Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **API Pattern:** RESTful
- **Additional:** dotenv (environment variables), CORS (cross-origin requests)

---

## Architecture Layers

```
┌─────────────────────────────────────────┐
│         Client Requests (HTTP)          │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│          Express.js Router              │
│      (Route handling & validation)      │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│           Controller Layer              │
│    (Request/Response handling logic)    │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│            Service Layer                │
│   (Business logic & query building)     │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│          MongoDB Database               │
│    (Data storage & aggregation)         │
└─────────────────────────────────────────┘
```

### Layer Responsibilities

**1. Router Layer**
- Defines API endpoints
- Maps HTTP methods to controller functions
- Handles route-level middleware

**2. Controller Layer**
- Receives HTTP requests
- Extracts and validates query parameters
- Calls service layer for business logic
- Formats and sends responses
- Handles error responses

**3. Service Layer**
- Contains core business logic
- Builds MongoDB aggregation pipelines
- Implements search, filter, sort, and pagination logic
- Query optimization strategies

**4. Model Layer**
- Defines MongoDB schema using Mongoose
- Data validation rules
- Database collection configuration

---

## Core Components

### 1. Router Layer (`routes/sales.routes.js`)

**Responsibilities:**
- Define `/api/sales` endpoint
- Map GET request to sales controller
- Route-level middleware (if any)

**Endpoints:**
- `GET /sales` - Retrieve sales with query options

---

### 2. Controller Layer (`controllers/sales.controller.js`)

**Responsibilities:**
- Extract and validate query parameters from request
- Call sales service with extracted parameters
- Format successful responses as JSON
- Handle errors and send error responses
- Proper HTTP status codes

**Request Flow:**
1. Receive HTTP request
2. Extract query params: `req.query`
3. Call `salesService.getSales(req.query)`
4. Return formatted response

**Response Format:**
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

---

### 3. Service Layer (`services/sales.service.js`)

**Responsibilities:**
- Core business logic for sales queries
- Build MongoDB aggregation pipelines dynamically
- Implement all search, filter, sort, pagination logic
- Query optimization and performance

**Key Functions:**

#### `getSales(queryParams)`

Main service function that processes query parameters and returns filtered, sorted, paginated sales data.

**Parameters:**
- `search` - Search query string (name or phone)
- `region` - Customer region filter
- `gender` - Gender filter
- `age` - Age range (e.g., "26-35" or "46-")
- `category` - Product category filter
- `payment` - Payment method filter
- `sort` - Sort field ('date', 'quantity', 'name')
- `order` - Sort order ('asc', 'desc')
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 10, max: 100)

---

### 4. Model Layer (`models/sales.model.js`)

**Responsibilities:**
- Define Sales document schema
- Set field types and validation
- Configure collection name
- Export Mongoose model

**Schema Fields (13 total):**
- Transaction ID
- Date
- Customer ID
- Customer Name
- Phone Number
- Gender
- Age
- Customer Region
- Product ID
- Product Category
- Quantity
- Total Amount
- Payment Method
- Employee Name

---

## Database Query Strategy

### MongoDB Aggregation Pipeline

TruSales uses MongoDB's powerful aggregation pipeline for complex querying with optimal performance.

**Pipeline Structure:**
```javascript
[
  { $addFields: { ... } },    // Type conversion (Age to int)
  { $match: { ... } },         // Filtering & Search
  { $sort: { ... } },          // Sorting
  { $skip: N },                // Pagination offset
  { $limit: M },               // Results per page
  { $project: { ... } }        // Field selection
]
```

### Algorithm Details

#### 1. Search Logic

```javascript
if (search && search.trim() !== "") {
  const isNumeric = /^\d+$/.test(search);
  
  if (isNumeric) {
    // Phone number prefix search
    match["Phone Number"] = { $regex: "^" + search, $options: "i" };
  } else {
    // Fuzzy name search with whitespace normalization
    const clean = search.trim().replace(/\s+/g, " ");
    const pattern = "^" + clean.split(" ").join(".*");
    match["Customer Name"] = { $regex: pattern, $options: "i" };
  }
}
```

**Search Features:**
- **Numeric Detection:** Automatically detects if search is for phone numbers
- **Phone Search:** Prefix matching (starts with digits)
- **Name Search:** Fuzzy matching across word boundaries
- **Example:** "kabir singh raj" → `^kabir.*singh.*raj`
- **Case-insensitive:** Both searches ignore case

#### 2. Filter Logic

```javascript
// Multiple values via comma separation
if (region) match["Customer Region"] = { $in: region.split(",") };
if (gender) match.Gender = { $in: gender.split(",") };
if (category) match["Product Category"] = { $in: category.split(",") };
if (payment) match["Payment Method"] = { $in: payment.split(",") };

// Age range with min-max parsing
if (age) {
  const [min, max] = age.split("-");
  match.Age = max 
    ? { $gte: Number(min), $lte: Number(max) }  // e.g., "26-35"
    : { $gte: Number(min) };                     // e.g., "46-" (46+)
}
```

**Filter Features:**
- **Multi-value Support:** Comma-separated values for OR logic
- **Age Ranges:** Flexible range format (e.g., "26-35", "46-")
- **Combined Filters:** All filters applied simultaneously in single `$match` stage

#### 3. Sort Logic

```javascript
let sortStage = {};

if (sort === "date") sortStage.Date = order === "asc" ? 1 : -1;
if (sort === "quantity") sortStage.Quantity = order === "asc" ? 1 : -1;
if (sort === "name") sortStage["Customer Name"] = order === "asc" ? 1 : -1;

// Default sorting
if (!sort) {
  if (match.$text) {
    sortStage = { score: { $meta: "textScore" } }; // Sort by relevance
  } else {
    sortStage = { _id: -1 }; // Sort by newest
  }
}
```

**Sort Options:**
- **Date:** Chronological or reverse-chronological
- **Quantity:** Low to high or high to low
- **Name:** Alphabetical or reverse-alphabetical
- **Default:** Newest first (by _id) or by relevance (for text search)

#### 4. Pagination Logic

```javascript
let pageNum = Number(page);
let limitNum = Number(limit);

if (!pageNum || pageNum < 1) pageNum = 1;       // Default page 1
if (!limitNum || limitNum < 1) limitNum = 10;   // Default limit 10

limitNum = Math.min(limitNum, 100);              // Max 100 per page
const skip = (pageNum - 1) * limitNum;           // Calculate offset

// Example: page=3, limit=10 → skip=20
```

**Pagination Features:**
- **Default Values:** Page 1, 10 results per page
- **Protection:** Maximum 100 results per page
- **Offset Calculation:** `skip = (page - 1) × limit`

#### 5. Aggregation Pipeline Construction

```javascript
const pipeline = [];

// CASE 1: Text search (must be first stage)
if (match.$text) {
  pipeline.push({ $match: match });
  pipeline.push({ $addFields: { score: { $meta: "textScore" } } });
  pipeline.push({
    $addFields: {
      Age: { $convert: { input: "$Age", to: "int" } }
    }
  });
}
// CASE 2: Non-text search
else {
  pipeline.push({
    $addFields: {
      Age: { $convert: { input: "$Age", to: "int" } }
    }
  });
  pipeline.push({ $match: match });
}

// Add sorting, pagination, projection
pipeline.push({ $sort: sortStage });
pipeline.push({ $skip: skip });
pipeline.push({ $limit: limitNum });
pipeline.push({ $project: { /* field selection */ } });
```

**Pipeline Stage Order (Critical):**
1. `$addFields` - Convert Age to integer for range filtering
2. `$match` - Apply all filters (search, region, gender, etc.)
3. `$sort` - Sort results by specified field
4. `$skip` - Skip documents for pagination
5. `$limit` - Limit results to page size
6. `$project` - Select fields to return

**Special Case:** Text search requires `$match` as first stage for performance

### Key Optimizations

- **Intelligent Query Detection:** Automatic detection of numeric vs text search
- **Efficient Regex Patterns:** Optimized patterns for fuzzy matching
- **Combined Filter Operations:** Single `$match` stage for all filters
- **Early Filtering:** Filters applied before sorting and pagination
- **Type Conversion:** Age converted to integer once for all range operations
- **Text Search Scoring:** Relevance ranking for text search results

---

## Folder Structure

```
Backend/
│
├── src/
│   │
│   ├── controllers/
│   │   └── sales.controller.js   # Request handling and response logic
│   │
│   ├── models/
│   │   └── sales.model.js        # Mongoose schema for Sales collection
│   │
│   ├── routes/
│   │   └── sales.routes.js       # API route definitions
│   │
│   ├── services/
│   │   ├── sales.service.js      # Business logic and aggregation pipeline
│   │   └── search.service.js     # Search-specific logic (optional)
│   │
│   └── utils/
│       └── db.js                 # MongoDB connection configuration
│
├── .env                          # Environment variables
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies and scripts
├── package-lock.json             # Dependency lock file
└── index.js                      # Express server entry point
```

---

## Module Responsibilities

### Server Module (`index.js`)

**Responsibilities:**
- Initialize Express application
- Configure middleware (CORS, JSON parser)
- Connect to MongoDB database
- Register API routes
- Start HTTP server on specified port
- Global error handling

**Dependencies:** Express, Mongoose, dotenv, CORS

**Port Configuration:** Reads from `.env` file (default: 3000)

---

### Database Configuration (`utils/db.js`)

**Responsibilities:**
- Establish MongoDB connection using Mongoose
- Handle connection errors and success messages
- Configure connection options
- Export connection function

**Connection String:** From environment variable `MONGO_URI`

---

### Sales Routes (`routes/sales.routes.js`)

**Responsibilities:**
- Define `/api/sales` endpoint
- Map GET request to sales controller
- Route-level middleware (if any)

**Endpoints:**
- `GET /sales` - Retrieve sales with query options

---

### Sales Controller (`controllers/sales.controller.js`)

**Responsibilities:**
- Extract and validate query parameters from request
- Call sales service with extracted parameters
- Format successful responses as JSON
- Handle errors and send error responses
- Proper HTTP status codes

**Request Flow:**
1. Receive HTTP request
2. Extract query params: `req.query`
3. Call `salesService.getSales(req.query)`
4. Return formatted response

---

### Sales Service (`services/sales.service.js`)

**Responsibilities:**
- Core business logic for sales queries
- Build MongoDB aggregation pipelines dynamically
- Implement all search, filter, sort, pagination logic
- Query optimization and performance

**Return Value:**
- Array of matching sales documents
- Typically 10 or fewer results per call

---

### Search Service (`services/search.service.js`)

**Responsibilities:**
- Specialized search logic (if separated from sales service)
- Advanced search algorithms
- Search optimization

**Note:** May be integrated into sales.service.js depending on implementation.

---

## Data Flow

### Request Processing Flow

```
HTTP GET /api/sales?search=kabir&region=North&page=1
        ↓
Express Router receives request
        ↓
sales.routes.js → sales.controller.js
        ↓
Controller extracts query parameters:
  - search: "kabir"
  - region: "North"
  - page: "1"
        ↓
Controller calls salesService.getSales(queryParams)
        ↓
Service builds aggregation pipeline:
  1. Convert Age to integer
  2. Match: { "Customer Name": /^kabir/i, "Customer Region": "North" }
  3. Sort by _id descending
  4. Skip 0 documents
  5. Limit 10 documents
        ↓
MongoDB executes aggregation pipeline
        ↓
Service returns array of matching documents
        ↓
Controller formats response:
  {
    success: true,
    count: 2,
    data: [...]
  }
        ↓
JSON response sent to client
```

### Example: Search Query Processing

```
User searches for "kabir" with region filter "North"

1. Request: GET /api/sales?search=kabir&region=North&page=1

2. Controller extracts:
   - search = "kabir"
   - region = "North"
   - page = "1"

3. Service processes:
   - Detects text search (not numeric)
   - Creates name regex: /^kabir/i
   - Adds region filter: { $in: ["North"] }
   - Sets pagination: skip=0, limit=10

4. Pipeline built:
   [
     { $addFields: { Age: { $convert: { input: "$Age", to: "int" } } } },
     { $match: { 
         "Customer Name": { $regex: /^kabir/i },
         "Customer Region": { $in: ["North"] }
       }
     },
     { $sort: { _id: -1 } },
     { $skip: 0 },
     { $limit: 10 },
     { $project: { /* fields */ } }
   ]

5. MongoDB executes and returns matches

6. Response:
   {
     "success": true,
     "count": 2,
     "data": [
       { "Customer Name": "Kabir Patel", ... },
       { "Customer Name": "Kabir Singh", ... }
     ]
   }
```

---

## Performance Considerations

### Database Optimizations

**1. MongoDB Indexing**
- Create indexes on frequently queried fields:
  - `Customer Name` (text index for search)
  - `Phone Number` (for numeric search)

**2. Aggregation Pipeline Efficiency**
- **Early Filtering:** Apply `$match` stage as early as possible
- **Stage Ordering:** Optimal order reduces documents processed
- **Type Conversion:** Done once at pipeline start
- **Field Projection:** Select only needed fields to reduce data transfer

**3. Query Protection**
- **Limit Cap:** Maximum 100 results per page prevents large result sets
- **Parameter Validation:** Early validation avoids unnecessary processing
- **Regex Optimization:** Anchored regex patterns (`^` prefix) for better performance

### Server Optimizations

**1. Stateless Design**
- No session storage required
- Each request is independent
- Enables horizontal scaling

**2. Error Handling**
- Comprehensive try-catch blocks
- Proper error responses with status codes
- Prevents server crashes

**3. Middleware Efficiency**
- Minimal middleware stack
- CORS configured for specific origins
- JSON parsing only when needed



---

**Last Updated:** December 2025
**Version:** 1.0