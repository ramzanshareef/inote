const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
    if (!req.session.isAuthenticated) {
        return res.status(401).json({ message: "Not Authorized!" });
    }
    else {
        next();
        return;
    }
}

module.exports = fetchUser;