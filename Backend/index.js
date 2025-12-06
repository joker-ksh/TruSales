const express = require('express');
const dotenv = require('dotenv');
const {connectDb} = require("./src/utils/db");
dotenv.config({ quiet: true });
const app = express();
app.use(express.json());
connectDb();

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`);
})