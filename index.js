const express = require('express');
const app = express();
const mongoose = require("mongoose")
require('dotenv').config();
mongoose.connect(process.env.MDB_URL, {useNewUrlParser:true})

app.listen(3001, () => console.log("Connected to port 3001"))