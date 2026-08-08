const service = require("../services/UserServices");

const getUsers = async (req,res) =>{
    
    try{
        const users = await service.obtener();
        res.json(users);
    }
    catch(error){
        res.status(500).json(error)
    }
}

const postUsers = async (req,res) =>{
     try{
        const users = await service.crear(req.body)
        res.json(users)
    }catch (error){
        res.status(500).json(error)
    }
}

const putUsers = async (req,res) =>{
    try{
        const users = await service.actualizar(
            req.params.id,
            req.body
        );
            res.json(users);
        }catch (error){
            res.status(500).json(error)
        }
}

const deleteUsers = async (req,res) =>{
        try{
            const route = await service.eliminar(
                req.params.id
            );
            res.json(route);
        }catch(error){
            res.status(500).json(error)
        }
}

module.exports = {
    getUsers,postUsers,putUsers,deleteUsers
};