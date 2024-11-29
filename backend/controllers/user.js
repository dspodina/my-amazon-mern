import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/user.js';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import validateUserName from '../utils/validateUsername.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';

const userControllers = {
    checkAdmin: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findOne({ _id: id });
            if (!user) {
                res.status(400).json({ message: 'User not found!' });
            }
            if (user.role === 'admin') {
                res.status(200).json({ message: 'Hi admin', isAdmin: true });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'err.message' });
        }
    },
    getUser: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findOne({ _id: id });
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(400).json({ message: 'User not found' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'err.message' });
        }
    },
    register: async (req, res) => {
        console.log(req);
        const { email, userName, password, rePassword } = req.body;

        try {
            // check if user already exist
            const userExist = await User.findOne({ email: email });
            if (userExist) {
                return res.status(400).json({ message: 'User already exist' });
            }
            // validate email, password, userName and check passwords match
            const isValidEmail = validateEmail(email);
            const isValidPassword = validatePassword(password);
            const isValidUserName = validateUserName(userName);
            const doMatchPassword = matchPasswords(password, rePassword);

            if (
                isValidEmail &&
                isValidPassword &&
                isValidUserName &&
                doMatchPassword
            ) {
                // hash the password
                const hashedPassword = hashPassword(password);
                const newUser = new User({
                    email,
                    password: hashedPassword,
                    userName
                });
                await newUser.save();
                res.status(201).json({
                    message: 'User created',
                    user: newUser
                });
            } else {
                return res
                    .status(400)
                    .json({ message: 'Invalid email or password' });
            }
        } catch (err) {
            res.status(500).json({
                message: 'An internal server error occurred'
            });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            // check if user already exist
            const userExist = await User.findOne({ email: email });
            if (!userExist) {
                return res.status(400).json({
                    message: 'User does not exist. Please, register!'
                });
            }
            // validate the password
            bcrypt.compare(password, userExist.password, (err, isValid) => {
                if (err) {
                    return res.status(500).json({
                        message: 'An internal server error occurred'
                    });
                }
                // create token
                if (isValid) {
                    const token = jwt.sign(
                        { user: userExist },
                        process.env.TOKEN_SECRET
                    );
                    //create cookie
                    res.cookie('token', token, { httpOnly: true });
                    res.status(200).json({
                        id: userExist._id,
                        userName: userExist.userName
                    });
                } else {
                    return res
                        .status(400)
                        .json({ message: 'Invalid email or password' });
                }
            });
        } catch (err) {
            res.status(500).json({
                message: 'An internal server error occurred'
            });
        }
    },
    logout: (req, res) => {
        res.clearCookie('token');
        res.status(200).json({ message: 'Successfully logout' });
    }
};

export default userControllers;
