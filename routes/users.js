// routes/user.js
const express = require("express");
const router = express.Router();
const { validateUser } = require("../validators/userValidator");
const { validateEmailCode } = require("../validators/emailValidator");
const { validateLogin } = require("../validators/loginValidator");
const { validatePersonalData } = require("../validators/personalValidator");
const { validateCompanyData } = require("../validators/companyValidator");
const {
  register,
  validateEmail,
  login,
  updatePersonalData,
  updateCompanyData,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

// Registro de usuario
router.post("/register", validateUser, register);

// Validación de email (requiere token JWT)
router.put("/validation", auth, validateEmailCode, validateEmail);

// Login
router.post("/login", validateLogin, login);

// On boarding: actualización de datos personales
router.put(
  "/onboarding/personal",
  auth,
  validatePersonalData,
  updatePersonalData
);

// On boarding: actualización de datos de la compañía
router.patch(
  "/onboarding/company",
  auth,
  validateCompanyData,
  updateCompanyData
);

module.exports = router;
