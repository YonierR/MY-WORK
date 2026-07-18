const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },

    price:{
        type: Number,
        min: 0
    },

    category:{
        type: String,
        default: "general",
        required: true
    }


});

module.exports = mongoose.model("User",UserSchema);