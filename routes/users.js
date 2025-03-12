// routes/user.js
const express = require("express");
const router = express.Router();
const { validateUser } = require("../validators/userValidator");
const { validateEmailCode } = require("../validators/emailValidator");
const { register, validateEmail } = require("../controllers/userController");
const auth = require("../middleware/auth");

// Registro de usuario
router.post("/register", validateUser, register);

// Validación de email
router.put("/validation", auth, validateEmailCode, validateEmail);

module.exports = router;
