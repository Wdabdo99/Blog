const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, registerValidate, loginValidate } = require("../models/user.js");

/**
 * @desc add new user
 * @route api/aut/register
 * @METHOD POST
 * access public
 */

module.exports.registerControler = async (req, res) => {
    try {
        const { error } = registerValidate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (user) {
            return res.status(400).json({ message: "user is already exsist" });
        }

        const salt = await bcrypt.genSalt(10);

        const hashpassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashpassword
        });

        res.status(201).json({ message: "register new user successfully" });
    } catch (error) {
        res.status(500).json({ message: "intarnal server error" });
    }
};

/**
 * @desc log in user
 * @route api/aut/login
 * @METHOD POST
 * access public
 */

module.exports.loginControler = async (req, res) => {
    try {
        const { error } = loginValidate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            return res
                .status(404)
                .json({ message: "email  is required!" });
        }

        const conpassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!conpassword) {
            return res.status(404).json({ message: " password is required" });
        }

        const token = await jwt.sign(
            {
                id: user?.id,
                isAdmin: user?.isAdmin,
                username: user?.username
            },
            process.env.KEY
        );

        res.status(200).json({
          user:{
            id: user?.id,
            isAdmin: user?.isAdmin,
            username: user?.username,
            porofilePhoto: user?.porofilePhoto,
            token: token
        }});
    } catch (error) {
        res.status(500).json({ message: "intarnal server error" });
    }
};
