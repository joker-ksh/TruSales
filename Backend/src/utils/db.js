const mongo = require("mongoose");

const connectDb = async () => {
    try {
        await mongo.connect(process.env.MONGO_URI);
        console.log("MongoDB connected !!!");
    }catch(err){
        console.error("DB connection failed:", err.message);
        process.exit(1);
    }
}

module.exports = {connectDb};