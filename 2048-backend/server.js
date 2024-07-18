const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const authRoutes = require('./auth');  // Import the auth routes

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://jaeyong207:JJkk5789@quinja.xmrrjt1.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/auth', authRoutes);  // Use the auth routes

app.listen(3001, () => {
    console.log("server is running on port 3001")
});

// mongodb+srv://jaeyong207:JJkk5789@quinja.xmrrjt1.mongodb.net/