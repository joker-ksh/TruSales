const Sale = require("../models/sales.model");

exports.searchSales = async (search) => {
  if (!search || search.trim() === "") {
    return [];
  }

  const isNumeric = /^\d+$/.test(search);  //if there would be number it will get flagged

  let query = {};
  let projection = {
    "Transaction ID": 1,
    Date: 1,
    "Customer ID": 1,
    "Customer Name": 1,
    "Phone Number": 1,
    Gender: 1,
    Age: 1,
    "Product Category": 1,
    Quantity: 1,
    "Total Amount": 1,
    "Customer Region": 1,
    "Product ID": 1,
    "Employee Name": 1
  };

  if (isNumeric) {
    // PHONE NUMBER SEARCH (REGEX PREFIX)
    query = {
      "Phone Number": { $regex: "^" + search, $options: "i" } //look inside field name Phone Number in db
      //e.g. "^" + search   →   "^9070"
      //"i" means : Case-insensitive match.
    };
  } else {
    // TEXT SEARCH FOR NAME
    query = {
      $text: { $search: search }
      // $text → for names always case in-sensitive
    };

    // ONLY APPLY SCORE PROJECTION FOR TEXT SEARCH
    projection.score = { $meta: "textScore" };
  }

  const results = await Sale
    .find(query, projection)
    .sort(isNumeric ? {} : { score: { $meta: "textScore" } })
    .limit(20);

  return results;
};


