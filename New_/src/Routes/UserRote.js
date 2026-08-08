const express = require("express")
const User = require("../controllers/UserControl");
const router = express.Router();

router.get("/",User.getUsers);

router.post("/crear",User.postUsers);

router.put("/update/:id",User.putUsers);

router.delete("/borrar/:id",User.deleteUsers)

module.exports = router;
