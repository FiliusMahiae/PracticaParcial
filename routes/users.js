// routes/user.js
const express = require("express");
const router = express.Router();
const { validateUser } = require("../validators/userValidator");
const { validateEmailCode } = require("../validators/emailValidator");
const { validateLogin } = require("../validators/loginValidator");
const {
  register,
  validateEmail,
  login,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

// Registro de usuario
router.post("/register", validateUser, register);

// Validación de email (requiere token JWT)
router.put("/validation", auth, validateEmailCode, validateEmail);

// Login
router.post("/login", validateLogin, login);

module.exports = router;
