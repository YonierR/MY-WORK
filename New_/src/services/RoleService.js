const Role = require("../Models/Role");

const obtener = async () =>{
    return await Role.find();
}

const crear = async (datos) =>{
    const role= await Role.create(datos);
    return role.save()
}

const eliminar = async (id) =>{
    return await Role.findByIdAndDelete(id);
}

const update = async (id,datos) =>{
    return await Role.findByIdAndUpdate(id,datos,
        {new : true}
    )
}


module.exports = {obtener,crear,eliminar,update};