const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const { parse } = require("dotenv");
const jwt = require("jsonwebtoken");

//register callback
const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res
                .status(200)
                .send({ message: "User Already Exist", success: false });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new userModel(req.body);
        await newUser.save();

        // for direct login
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        // console.log(token);

        res.status(201).send({
            message: "Registered Successfully",
            success: true,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Register Controller ${error.message}`,
        });
    }
};

// login callback

const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(200)
                .send({ message: "User not found", success: false });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res
                .status(200)
                .send({ message: "Invalid email or password", success: false });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.status(200).send({
            message: "Login Successful",
            success: true,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: `Error in login controller ${error.message}`,
        });
    }
};

const authController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        user.password = undefined;
        if (!user) {
            return res.status(200).send({
                message: "user not found",
                success: false,
            });
        } else {
            res.status(200).send({
                success: true,
                data: user,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "auth error",
            success: false,
        });
    }
};

const checkPasswordController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.body.email });
        console.log(user);
        if (!user) {
            return res
                .status(200)
                .send({ message: "User not found", success: false });
        }

        const isMatch = await bcrypt.compare(req.body.body.password, user.password);
        if (!isMatch) {
            return res
                .status(200)
                .send({ message: "Invalid password", success: false });
        }

        res.status(200).send({
            message: "Correct Password",
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: `Error in check Password controller ${error.message}`,
        });
    }
};

const changePasswordController = async (req, res) => {
    try {
        console.log(req.body.body);
        const user = await userModel.findOne({ email: req.body.body.email });
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.body.newpassword, salt);
        user.password = hashedPassword;
        await user.save();

        // Generate a new token with the updated user information
        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).send({
            message: "Password changed successfully",
            success: true,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Change Password Controller ${error.message}`,
        });
    }
};

module.exports = {
    loginController,
    registerController,
    authController,
    checkPasswordController,
    changePasswordController,
};
