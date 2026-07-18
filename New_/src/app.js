require("dotenv").config();
const express = require("express");
const app = express();
const DB = require("./Config/db")
const rutas = require("./routes/rote")
app.use(express.json())

app.use("/",rutas)

DB();


app.listen(process.env.PORT , () =>{
    console.log(`Servidor conectado a http://localhost:${process.env.PORT}`)
})