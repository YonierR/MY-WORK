const User = require("../Models/User");

const obtener  = async () =>{
    try{
    const user= await User.find().populate("role");
        return user
    }catch(err){
       return err
    }
}

const crear = async (datos) =>{
    try{
    const user= await User.create(datos);
    return user.save()
    }catch(err){
        return err.message
    }
}


const actualizar = async (id,datos) =>{
    return await User.findByIdAndUpdate(id,datos,
        {new : true}
    );
}

const eliminar = async (id) =>{
    return await User.findByIdAndDelete(id);
}

module.exports = {obtener,crear,actualizar,eliminar};