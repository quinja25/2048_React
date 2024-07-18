const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('./models/user');  // Adjusted import path
const router = express.Router();

const JWT_SECRET = 'your_jwt_secret_key';

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(400).send('Error registering user');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: '1h',
    });

    res.send({ token, bestScore: user.bestScore });
});

router.post('/update-score', async (req, res) => {
    const { token, score } = req.body;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (score > user.bestScore) {
            user.bestScore = score;
            await user.save();
        }

        res.send('Score updated');
    } catch (error) {
        res.status(400).send('Invalid token');
    }
});

module.exports = router;