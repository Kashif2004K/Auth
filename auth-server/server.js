const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json()); // Allows the server to read JSON sent from React
app.use(cors());         // Allows the connection between Frontend & Backend

// A "Fake" Database for learning (we will use a real one later)
const users = [];

// THE SECRET KEY (In a real app, this goes in your .env file)
const SECRET_KEY = "my_super_secret_key_123";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Get token from "Bearer <token>"

    if (!token) return res.status(401).send("Access Denied: No Token Provided");

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified; // Attach user info to the request
        next(); // Move to the next function
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
};

// A Protected API Route
app.get('/api/data', verifyToken, (req, res) => {
    res.json({ message: "This is secret data from the server!", user: req.user });
});

// 1. SIGNUP ROUTE
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.status(201).send("User registered!");
});

// 2. LOGIN ROUTE (This is where the JWT is born)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (user && await bcrypt.compare(password, user.password)) {
        // Create the Token: { payload }, secretKey, { options }
        const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send("Invalid credentials");
    }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));