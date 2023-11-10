const express = require("express")
const router = express.Router();
const fetchUser = require("../middlewares/fetchUser");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_Secret = process.env.JWT_SECRET || "thisismysecretkey";

router.post("/signup", [
    body("name", "Enter Valid Name").isLength({ min: 3 }),
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Enter Valid Password").isLength({ min: 5 })]
    , async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(409).json({ message: "Sorry, a user with this EMail already exists!" });
            }
            let salt = bcrypt.genSaltSync(10);
            let secPass = bcrypt.hashSync(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            });
            const data = {
                username: {
                    id: user.id
                }
            };
            let token = jwt.sign(data, JWT_Secret);
            return res.status(200).json({ token });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    })

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Incorrect Credentials" });
        }
        const comparePass = bcrypt.compareSync(password, user.password);
        if (!comparePass) {
            return res.status(401).json({ message: "Incorrect Credentials" });
        }
        const data = {
            username: {
                id: user.id
            }
        };
        const token = jwt.sign(data, JWT_Secret);
        return res.status(200).json({ token });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

router.post("/user", fetchUser, async (req, res) => {
    try {
        let id = req.user.id;
        const user = await User.findById(id).select("-password -__v -_id");
        return res.status(200).json({ user });
    }
    catch (err) {
        return res.status(520).json({ message: err.message });
    }
})

module.exports = router;