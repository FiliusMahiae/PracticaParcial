const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { validateUser } = require("../validators/userValidator");

router.post("/register", validateUser, userController.register);

module.exports = router;
