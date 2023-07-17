const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



const createUser = async (req, res) => {
    try {

        const reqData = req.body
        const { name, email, password, location } = reqData

        const checkEmail = await userModel.findOne({ email })
        if (checkEmail) {
            return res.status(400).send({ success: false, message: 'Email already exists' })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = await userModel.create({ name, email, password: hashedPassword, location })
        res.status(201).send({ success: true, data: userData })
    } catch (error) {
        return res.status(500).send({
            success: false,
            error: error.message,
        });
    }

};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists in the database
        const userEmail = await userModel.findOne({ email });

        if ( !userEmail ) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        let comparedPass = await bcrypt.compare(password, userEmail.password)
        if (!comparedPass) {
            return res.status(401).json({ success: false, error: "Password doesn't match" });
        }

        let token = jwt.sign(
            {
                userId: userEmail._id.toString(),
            },
            "secret_key", {
            expiresIn: '4d' // expires in 10h
        });

        let data = {
            userId: userEmail._id.toString(),
            token: token
        }
        return res.status(201).json({ success: true, message: "User login successfull", data: data })

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to log in' });
    }
};


module.exports = { createUser, login }