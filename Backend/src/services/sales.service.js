const Sale = require("../models/sales.model");

exports.getSales = async (queryParams) => {
    console.log("Incoming Query Params:", queryParams);
    
  const {
    search,
    region,
    gender,
    age,
    category,
    payment,
    date,
    sort,
    order,
    page,
    limit,
  } = queryParams;

  let match = {};

  // -------------------------
  // SEARCH LOGIC
  // -------------------------
  if (search && search.trim() !== "") {
    const isNumeric = /^\d+$/.test(search);

    if (isNumeric) {
      match["Phone Number"] = { $regex: "^" + search, $options: "i" };
    } else {
      match.$text = { $search: search };
    }
  }

  // -------------------------
  // FILTERS
  // -------------------------
  if (region) match["Customer Region"] = { $in: region.split(",") };
  if (gender) match.Gender = { $in: gender.split(",") };

  if (age) {
    const [min, max] = age.split("-");
    match.Age = max
      ? { $gte: Number(min), $lte: Number(max) }
      : { $gte: Number(min) };
  }

  if (category) match["Product Category"] = { $in: category.split(",") };
  if (payment) match["Payment Method"] = { $in: payment.split(",") };

  if (date) {
    let days = 0;
    if (date === "last7") days = 7;
    if (date === "last30") days = 30;
    if (date === "last90") days = 90;

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    match.Date = { $gte: fromDate.toISOString().split("T")[0] };
  }

  // -------------------------
  // SORTING
  // -------------------------
  let sortStage = {};

  if (sort === "date") sortStage.Date = order === "asc" ? 1 : -1;
  if (sort === "quantity") sortStage.Quantity = order === "asc" ? 1 : -1;
  if (sort === "name") sortStage["Customer Name"] = order === "asc" ? 1 : -1;

  if (!sort) {
    if (match.$text) {
      sortStage = { score: { $meta: "textScore" } };
    } else {
      sortStage = { _id: -1 };
    }
  }

  // -------------------------
  // SAFE PAGINATION
  // -------------------------
  let pageNum = Number(page);
  let limitNum = Number(limit);

  if (!pageNum || pageNum < 1) pageNum = 1;
  if (!limitNum || limitNum < 1) limitNum = 10;

  limitNum = Math.min(limitNum, 100);
  const skip = (pageNum - 1) * limitNum;

  // -------------------------
  // AGGREGATION PIPELINE
  // -------------------------
  const pipeline = [];

  // -------------------------
  // CASE 1: TEXT SEARCH → MUST BE FIRST STAGE
  // -------------------------
  if (match.$text) {
    pipeline.push({ $match: match }); // MUST come first

    pipeline.push({ $addFields: { score: { $meta: "textScore" } } });

    pipeline.push({
      $addFields: {
        Age: {
          $convert: {
            input: "$Age",
            to: "int",
            onError: null,
            onNull: null,
          },
        },
      },
    });

  } else {
    // -------------------------
    // CASE 2: NON-TEXT SEARCH
    // -------------------------
    pipeline.push({
      $addFields: {
        Age: {
          $convert: {
            input: "$Age",
            to: "int",
            onError: null,
            onNull: null,
          },
        },
      },
    });

    pipeline.push({ $match: match });
  }

  // Sorting, skip, limit
  pipeline.push({ $sort: sortStage });
  pipeline.push({ $skip: skip });
  pipeline.push({ $limit: limitNum });

  // Projection stage
  const projectStage = {
    "Transaction ID": 1,
    Date: 1,
    "Customer ID": 1,
    "Customer Name": 1,
    "Phone Number": 1,
    Gender: 1,
    Age: 1,
    "Customer Region": 1,
    "Product ID": 1,
    "Product Category": 1,
    Quantity: 1,
    "Total Amount": 1,
    "Payment Method": 1,
    "Employee Name": 1,
  };

  if (match.$text) projectStage.score = 1;

  pipeline.push({ $project: projectStage });

  // -------------------------
  // RUN QUERY
  // -------------------------
  return await Sale.aggregate(pipeline);
};
