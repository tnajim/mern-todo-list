const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const dbUrl = "mongodb://127.0.0.1:27017/mern-todo"; // for deployment use .process.env.DB_URL
// const dbUrl ='mongodb://127.0.0.1:27017/mern-todo'; // (local mongodb)

mongoose.connect(dbUrl)
    .then(() => console.log("MongoDB Connection Established."))
    .catch(error => console.log("MongoDB Error Occured.", error));



// listen to server
app.listen(3000, () => {
    console.log("Listening on Port 3000");
})