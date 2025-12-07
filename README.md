# TruSales

> **A comprehensive Retail Sales Management System with advanced search, filtering, and data visualization capabilities**

---

## 1. Table of Contents

- [Overview](#2-overview)
- [Tech Stack](#3-tech-stack)
- [Key Features](#4-key-features)
  - [Search Implementation](#41-search-implementation)
  - [Filter Implementation](#42-filter-implementation)
  - [Sorting Implementation](#43-sorting-implementation)
  - [Pagination Implementation](#44-pagination-implementation)
- [Setup Instructions](#5-setup-instructions)
- [API Endpoints](#6-api-endpoints)

---

## 2. Overview

TruSales is an end-to-end Retail Sales Management interface that provides efficient search, filtering, sorting, and pagination capabilities over structured sales datasets. The system is engineered with clear separation of concerns across frontend and backend layers, leveraging MongoDB's powerful aggregation pipeline for optimal query performance.

**Key Highlights:**
- Real-world engineering workflow with production-ready patterns
- Scalable architecture supporting large datasets
- Intuitive UI aligned with modern design principles
- Efficient database querying using MongoDB aggregation pipelines

---

## 3. Tech Stack

### Frontend
- **React** - UI library for building interactive interfaces
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling tool

---

## 4. Key Features

### 4.1. Search Implementation

Full-text search capabilities across multiple fields:

- **Searchable Fields:**
  - Customer Name
  - Phone Number

- **Advanced Features:**
  - Case-insensitive matching
  - Whitespace normalization and fuzzy pattern matching
  - Intelligent numeric detection for phone prefix search
  - Seamless integration with active filters, sorting, and pagination

**Technical Implementation:** The backend intelligently identifies query types (numeric vs. textual) and applies appropriate `$regex` or `$text`-based search strategies.

---

### 4.2. Filter Implementation

Multi-select and range-based filtering system:

- **Available Filters:**
  - Customer Region
  - Gender
  - Age Range
  - Product Category
  - Payment Method

- **Key Characteristics:**
  - Independent filter operation
  - Efficient processing via MongoDB's `$match` stage
  - Real-time result updates

---

### 4.3. Sorting Implementation

Flexible sorting options to organize data effectively:

- **Sort Options:**
  - Date (newest first)
  - Quantity (ascending/descending)
  - Customer Name (A–Z / Z–A)

- **Features:**
  - Works alongside active filters and search
  - Dynamic `$sort` stage construction from query parameters
  - Preserves filter and search states

---

### 4.4. Pagination Implementation

Standard, predictable pagination structure:

- **Configuration:**
  - Fixed page size: 10 items per page
  - Next/Previous navigation support
  - State preservation across search, filter, and sort operations

- **Technical Details:**
  - Uses `$skip` and `$limit` stages
  - Formula: `skip = (page - 1) * limit`
  - Maximum limit cap for performance safety
  - Optimized for large datasets with complex filter combinations

---

---

## 5. Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Step 1: Clone the Repository

```bash
git clone <repo-url>
```

### Step 2: Backend Setup

```bash
cd Backend
npm install
```

### Step 3: Prepare the Dataset

The original dataset was provided as a CSV file. For better compatibility with MongoDB and the MERN stack, it has been converted to JSON format using the `csvtojson` package.

**Convert CSV to JSON (if needed):**

```bash
npm install -g csvtojson
csvtojson sales-data.csv > dataset.json
```

**Import JSON dataset into MongoDB:**

```bash
mongoimport --db <your-db-name> \
  --collection sales \
  --file dataset.json \
  --jsonArray
```

This command loads the entire dataset into your MongoDB instance.

### Step 4: Configure Environment Variables

Create a `.env` file in the `backend` folder:

```env
MONGO_URI=<your-mongo-connection-string>
PORT=3000
```

### Step 5: Start the Backend Server

```bash
npm start
```

Backend will be available at: `http://localhost:3000/api/sales`

### Step 6: Frontend Setup

```bash
cd ../Frontend
npm install
```

### Step 7: Start the Frontend

```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

---

## 6. API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/sales` | Retrieve sales data with optional filters, search, sort, and pagination |

### Query Parameters

| Parameter | Type | Description | Possible Values | Example |
|-----------|------|-------------|-----------------|---------|
| `search` | string | Search by customer name or phone number. Supports numeric (phone prefix) and text (fuzzy name matching) | Any text or numeric string | `search=kabir` or `search=98` |
| `region` | string | Filter by customer region. Multiple values supported (comma-separated) | `North`, `South`, `West`, `East`, `Central` | `region=North,South` |
| `gender` | string | Filter by gender. Multiple values supported (comma-separated) | `Male`, `Female` | `gender=Male,Female` |
| `age` | string | Filter by age range. Use format `min-max` or `min-` for open-ended ranges | `18-25`, `26-35`, `36-45`, `46-` | `age=26-35` or `age=46-` |
| `category` | string | Filter by product category. Multiple values supported (comma-separated) | `Clothing`, `Beauty`, `Electronics` | `category=Electronics,Clothing` |
| `payment` | string | Filter by payment method. Multiple values supported (comma-separated) | `Credit Card`, `UPI`, `Debit Card`, `Cash`, `Net Banking` | `payment=UPI,Cash` |
| `sort` | string | Sort field | `date`, `quantity`, `name` | `sort=date` |
| `order` | string | Sort order (default: `desc`) | `asc`, `desc` | `order=desc` |
| `page` | number | Page number (default: 1) | Any positive integer | `page=2` |
| `limit` | number | Items per page (default: 10, max: 100) | 1-100 | `limit=10` |
---

---

## 7. Contact

For questions or support, please reach out amanmaurya3721@gmail.com

---