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
    sort,
    order,
    page,
    limit,
  } = queryParams;

  let match = {}; //criteria to create pipline 

  // SEARCH LOGIC
  if (search && search.trim() !== "") {
    const isNumeric = /^\d+$/.test(search); //check numeric regex 

    if (isNumeric) {
      match["Phone Number"] = { $regex: "^" + search, $options: "i" }; //phone number search logic with matching the numbers
    } else {
      const clean = search.trim().replace(/\s+/g, " "); //first remove the whitespace from start and end
      const pattern = "^" + clean.split(" ").join(".*"); // now convert like this : "kabir singh raj" → "^kabir.*singh.*raj" for mongo matching

      match["Customer Name"] = { //giving the query to the pipeline
        $regex: pattern,
        $options: "i"
      };
    }
  }



 
  // FILTERS
  if (region) match["Customer Region"] = { $in: region.split(",") }; //can handle two Region at a time also North,South
  if (gender) match.Gender = { $in: gender.split(",") }; //in the same way in query if both male and female required then &gender=Male,Female

  if (age) {
    const [min, max] = age.split("-"); //extract the min and max age from the query it would be like age=25-30 something like that

    //if only max as in the frontend there is one option of filter just for  46+ so for that case this ternary operator to handle that case
    match.Age = max ? { $gte: Number(min), $lte: Number(max) } : { $gte: Number(min) };
  }

  if (category) match["Product Category"] = { $in: category.split(",") }; //agin multiple category also possible so this is that to add in pipeline
  if (payment) match["Payment Method"] = { $in: payment.split(",") };  //same for paayment method

  
  // SORTING
  let sortStage = {}; //used to put sorting stage 

  if (sort === "date") sortStage.Date = order === "asc" ? 1 : -1; //if the req is sort=date then we set the field Date inside sortStage and 1 or -1 according to asc or dsc
  if (sort === "quantity") sortStage.Quantity = order === "asc" ? 1 : -1; //in the same date way
  if (sort === "name") sortStage["Customer Name"] = order === "asc" ? 1 : -1;

  if (!sort) { 
    if (match.$text) { //if it is a text search and no sort then 
      sortStage = { score: { $meta: "textScore" } };//Sort results by MongoDB text search relevance score.
    } else { //else sort by default object id
      sortStage = { _id: -1 }; //default to sorting by newest items
    }
  }


  // SAFE PAGINATION
  let pageNum = Number(page); //any page number &page=43
  let limitNum = Number(limit); // &limit=10 or &limit=20 in our case it is 10

  if (!pageNum || pageNum < 1) pageNum = 1; //If the user sends an invalid page, always go to page 1.
  if (!limitNum || limitNum < 1) limitNum = 10; //set default limit if it is not defined in query to 10

  limitNum = Math.min(limitNum, 100); //even if the request is for 2300 limit it to max 100 only this will allow the availability of the db
  const skip = (pageNum - 1) * limitNum; //logic to skip the number of datapoints to skips 
  //eg. pageNum = 3 and limitNum = 10 then skip = (3 - 1) * 10 = 20 so leave first 20 datapoints and send others

  

  // AGGREGATION PIPELINE
  const pipeline = []; //MongoDB aggregation works by passing an array of "stages"

  // CASE 1: TEXT SEARCH → MUST BE FIRST STAGE
  //Text search has strict rules:
  //The $match stage containing $text MUST be the first stage in the pipeline.
  if (match.$text) {  //Did the match object contain a $text field?
    pipeline.push({ $match: match }); // MUST come first

    pipeline.push({ $addFields: { score: { $meta: "textScore" } } }); //score is MongoDB's text relevance score : It determines how closely a document matches the text search

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
    // CASE 2: NON-TEXT SEARCH
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

  pipeline.push({ $project: projectStage }); //this is the projection quert in mongo works same like SELECT in mysql.

  // RUN QUERY
  return await Sale.aggregate(pipeline); //run the pipeline and give the matches
};
