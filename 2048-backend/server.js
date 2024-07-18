const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://jaeyong207:JJkk5789@quinja.xmrrjt1.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const authRoutes = require('./auth'); // Import auth routes

app.use('/auth', authRoutes); // Use auth routes

app.listen(3001, () => {
    console.log("server is running on port 3001");
});