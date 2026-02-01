const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User'); 
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);


app.post('/api/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        res.status(400).json({ error: "Signup failed. Email might already exist." });
    }
});


app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        
        if (user) {
            res.json({ message: "Login successful!", user: user.email });
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(3000, () => console.log("Auth Server running on port 3000"));