const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema(
  {},
  {
    strict: false,         // accept whatever fields exist in DB currently
    collection: "sales"    // your actual Mongo collection name
  }
);


//made the combined index for both Customer Name and Phone Number so that only one search bar can handle both 
salesSchema.index({
  "Customer Name": "text",
  "Phone Number": "text"
});

//const { search } = req.query;
//search === "rahul" -> { $text: { $search: "rahul" } }
//search === "9070" -> { $text: { $search: "9070" } }
//Now mongo db will find this in db as the following 
//  Sale.find({ 
//   $text: { $search: "rahul" }
//  }) => will give all the matches


module.exports = mongoose.model("Sale", salesSchema);


