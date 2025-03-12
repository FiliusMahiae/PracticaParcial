const User = require("../models/User");
const { encrypt } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "El usuario ya existe." });
    }
    // Cifrar la contraseña utilizando handlePassword
    const hashedPassword = await encrypt(password);
    // Generar código de verificación
    const verificationCode = generateVerificationCode();
    // Crear el usuario
    const user = new User({
      email,
      password: hashedPassword,
      verificationCode,
      attempts: process.env.MAX_ATTEMPTS || 3,
    });
    await user.save();
    // Generar token JWT utilizando tokenSign
    const token = await tokenSign(user);
    // Responder con los datos del usuario y el token
    res.json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        status: user.status,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    handleHttpError(res, "Error interno del servidor", 500);
  }
};
