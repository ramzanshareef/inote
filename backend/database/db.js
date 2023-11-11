const mongoose = require("mongoose");
const databaseURL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/";
const db = process.env.DATABASE || "inote";
const mongoURL = databaseURL + db;
const connectToMongo = async () => {
    await mongoose.connect(mongoURL)
    .then(() => {
        console.log("Connected MongoDB");
    })
    .catch((err) => {
        console.log("MongoDB Error = " + err.message);
    })
}

module.exports = connectToMongo;