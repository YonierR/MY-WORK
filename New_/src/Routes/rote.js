const express = require("express")
const User = require("../controllers/UserControl");

const router = express.Router();

router.get("/",User.getUsers);

module.exports = router;