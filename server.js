const express = require('express')
const colors = require('colors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

//dotenv config
dotenv.config()

//mongodb connection
connectDB();

//rest object
const app = express()

//middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//routes
app.use("/api/v1/user",require("./routes/userRoutes"));
app.use("/api/v1/admin",require("./routes/adminRoutes"));
app.use("/api/v1/controller",require("./routes/controllerRoutes"));

//port
const port = process.env.PORT || 8080

//listen port
app.listen(port,()=>{
    console.log(`Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
    .bgCyan.white
    );
});