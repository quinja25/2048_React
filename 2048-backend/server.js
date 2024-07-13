const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const EmployeeModel = require('./models/Employee')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://chanbinna:chan3927%5E%5E@cluster0.iihcbxi.mongodb.net/employee");

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                } else {
                    res.json("The password isn't correct")
                }
            } else {
                res.json("Incorrect Email")
            }
        })
})

app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("server is running")
})