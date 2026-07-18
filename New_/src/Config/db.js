require ("dotenv").config()
const mongoose = require("mongoose");

const DB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongoose Conectado");
    }
    catch(error){
        console.log(error);
    }
};

module.exports = DB;

