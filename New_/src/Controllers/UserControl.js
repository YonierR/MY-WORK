const User = require("../models/model");
const getUsers = async (req,res) =>{
    
    try{const users = await User.find();
        res.json(users);
    }
    catch(error){
        res.status(500).json({
            mensaje:error.message
        })
    }
}

module.exports = {
    getUsers
};