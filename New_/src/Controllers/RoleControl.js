const services = require("../services/RoleService");

const getRole = async (req,res) =>{
    try{
        const roles = await services.obtener();
        res.json(roles);
    }catch(error){
        res.status(500).json(error);
    }
}

const postRole = async (req,res) =>{
    try{
        const roles = await services.crear(req.body);
        res.json(roles);
    }catch(error){
        res.status(500).json(error);
    }
}

const deleteRole = async (req,res) =>{
    try{
        const roles = await services.eleminar(req.params.id);
        res.json(roles);
    }catch(err){
        res.status(500).json(error);
    }
}

const updateRole = async (req,res) =>{
    try{
        const role = await services.update(req.paramas.id,req.body)
        res.json(roles);
    }catch(err){
        res.status(500).json(err);
    }    
}
module.exports = {getRole,postRole,deleteRole,updateRole}