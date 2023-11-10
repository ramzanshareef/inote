const mongoose = require("mongoose");
const databaseURL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/inote";
const connectToMongo = async () => {
    await mongoose.connect(databaseURL)
    .then(() => {
        console.log("Connected MongoDB");
    })
    .catch((err) => {
        console.log("MongoDB Error = " + err.message);
    })
}

module.exports = connectToMongo;