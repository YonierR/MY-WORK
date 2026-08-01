const User = require("../Models/model");

const obtener  = async () =>{
    return await User.find();
}

const crear = async (datos) =>{
    return await User.create(datos);
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