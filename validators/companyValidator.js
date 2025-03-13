// validators/companyValidator.js
const { check } = require("express-validator");
const validatorResults = require("../utils/handleValidator");

exports.validateCompanyData = [
  check("companyName", "El nombre de la compañía es obligatorio").notEmpty(),
  check("cif", "El CIF es obligatorio").notEmpty(),
  check("direccion", "La dirección es obligatoria").notEmpty(),
  validatorResults,
];
