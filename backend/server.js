require("dotenv").config()
const connectToMongo = require("./database/db");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session");
const port = process.env.PORT || 5000;
const databaseURL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";
const db = process.env.DATABASE || "inote";

const MongoDBStore = mongoDBStore(session);
const sessionStore = new MongoDBStore({
    uri: databaseURL,
    databaseName: db,
    collection: "user-sessions"
});

connectToMongo();

const app = express();
app.use(session({
    secret: "session-secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));

app.use(cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));


app.listen(port, () => {
    console.log(`Connected Server http://localhost:${port}`);
})