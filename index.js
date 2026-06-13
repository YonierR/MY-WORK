require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const route = require('./routes/router');
app.use(route);

mongoose

.connect(process.env.MONGO_URI)

.then(()=>{console.log(`mongoose activo`)})


app.listen(process.env.PORT, ()=>{
    console.log(`servidor activo en : http://localhost:${process.env.PORT}`)
}); 