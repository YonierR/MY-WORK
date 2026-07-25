const express = require("express")
const User = require("../controllers/UserControl");
const model = require("../models/model")
const router = express.Router();

router.get("/",User.getUsers);

router.post("/crear", async (req,res) =>{
    try{
        const route = new model(req.body)
        await route.save()
        res.json(route)
    }catch (error){
        res.status(500).json(error)
    }
});

router.put("/update/:id", async (req,res) =>{
    try{
        const route = await model.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true }
        );


        res.json(route);
    }catch (error){
        res.status(500).json(error)
    }
});

router.delete("/borrar/:id", async (req,res) =>{
    try{
        const route = await model.findByIdAndDelete(
            req.params.id
        );

        res.json(route);
    }catch(error){
        res.status(500).json(error)
    }
});

module.exports = router;