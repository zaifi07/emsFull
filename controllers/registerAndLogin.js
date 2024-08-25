const { comparePassword, hashing } = require('../helper/passProtection')
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const registerationController = async (req, res) => {
    try {
        // console.log("Data from signup", req.body);
        const { name, email, password } = req.body;

        // Check if the email already exists in the database
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            res.status(303).json({
                success: false,
                message: 'user is already defined'
            })
        }
        else {
            const hashed = await hashing(password)
            const newUser = new userModel({
                name,
                email,
                password: hashed,
            });
            await newUser.save();
            res.status(200).json({
                success: true,
                message: 'Account has been registered'
            })
        }
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            success: false,
            error: "Registration failed. Please try again later."
        });
    }
}


const loginController = async (req, res) => {
    const email = req.body.email;
    // console.log(email);
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        const authorized = await comparePassword(req.body.password, existingUser.password)
        if (authorized) {
            const dataToSend = {
                name: existingUser.name,
            };

            const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
            res.status(200).send({
                success: true,
                dataToSend,
                token,
            })
        }
        else {
            res.status(401).send({
                success: false,
                message: "credentials didn't match"
            })
        }

    }
    else {
        res.status(404).send({
            success: false,
            message: 'user not found'
        })
    }
}


const testingback = async (req, res) => {
    res.status(200).send({
        success: true,
        message: 'testing done'
    })
}

module.exports = { registerationController, loginController, testingback }