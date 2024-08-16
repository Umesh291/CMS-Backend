import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
configDotenv();

export const registerUser = (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body)

    User.create({ name, email, password })
        .then(result => {
            console.log("success")
            return res.status(200).json({ Message: 'Success', result });

        }).catch(err => {
            console.log(err);
            return res.status(500).json({ error: 'Failed' });

        })
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ error: 'user not found' });

        const isMatch = await bcrypt.compare(password, user.password);


        if (!isMatch) return res.status(401).json({ error: 'wrong password' });
        const payload = { email }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });


        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};