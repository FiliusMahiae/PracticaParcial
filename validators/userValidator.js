const { check, validationResult } = require("express-validator");

exports.validateUser = [
  check("email", "El email es obligatorio").not().isEmpty(),
  check("email", "El email debe ser válido").isEmail(),
  check("password", "La contraseña es obligatoria").not().isEmpty(),
  check("password", "La contraseña debe tener al menos 8 caracteres").isLength({
    min: 8,
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
