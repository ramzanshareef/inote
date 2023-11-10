const jwt = require("jsonwebtoken");
const JWT_Secret = process.env.JWT_SECRET || "thisismysecretkey";

const fetchUser = (req, res, next) => {
    let token = req.header("token");
    jwt.verify(token, JWT_Secret, (err, data) => {
        if (data) {
            req.user = data.username;
            next();
        }
        else {
            return res.status(400).json({ message: err.message });
        }
    })
}

module.exports = fetchUser;