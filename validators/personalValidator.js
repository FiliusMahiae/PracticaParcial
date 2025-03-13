// validators/personalValidator.js
const { check } = require("express-validator");
const validatorResults = require("../utils/handleValidator");

exports.validatePersonalData = [
  check("nombre", "El nombre es obligatorio").notEmpty(),
  check("apellidos", "Los apellidos son obligatorios").notEmpty(),
  check("nif", "El NIF es obligatorio").notEmpty(),
  // Se puede agregar validación adicional para el formato del NIF
  validatorResults,
];
