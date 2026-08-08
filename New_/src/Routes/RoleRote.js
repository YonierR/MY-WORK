const express = require("express")
const Role = require("../controllers/RoleControl")
const roter = express.Router();

roter.get("/",Role.getRole);

roter.post("/crear",Role.postRole);

roter.delete("/eleminar/:id",Role.deleteRole);

roter.put("/update/:id",Role.updateRole);

module.exports = roter;
