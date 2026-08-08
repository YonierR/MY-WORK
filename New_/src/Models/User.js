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
    },

    role:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Role",
        required: true 
    }


});

const User = mongoose.models.User||mongoose.model("User",UserSchema);

module.exports = User;