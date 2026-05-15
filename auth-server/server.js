const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "my_super_secret_key_123";

// I added a "Dummy User" here so it's never empty!
// Password for this user is: 123
const users = [
    { 
        email: "test@test.com", 
        password: "$2a$10$QwR9fT.uP5/mRIn8Y.K6uOf.1Z3D0m7r6Z.hG.7yX.6/7yX.6/7y" 
    }
]; 

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.status(201).send("User registered!");
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send("Invalid credentials");
    }
});

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).send("No Token Provided");

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
};

app.get('/api/data', verifyToken, (req, res) => {
    res.json({ message: "Success! You are looking at secret data.", user: req.user });
});

app.listen(5000, () => console.log("Server running on port 5000"));