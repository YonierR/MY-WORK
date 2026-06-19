require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const route = require("./Routes/route");
app.use(express.json());

mongoose

.connect(process.env.MONGO_URI)

.then(() => {
  console.log("Conectado a Mongo");
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en  http://localhost:${process.env.PORT}`);
});