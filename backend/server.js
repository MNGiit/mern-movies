const express = require('express'); // Import express
const app = express();              // Create variable to hold express methods
const dotenv = require('dotenv');   // Import dotenv to connect to configuration file
const mongoose = require('mongoose'); // Import mongoose to connect to database

dotenv.config(); // use dotenv to connect config file

// Create variable to represent database
// mongoose.connect()
const DB = mongoose.connect(
    process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD)
)
.then(() => {
    console.log("DB connection is successful!");
})

// Port
const port = 5000;

// Listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})