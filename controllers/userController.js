const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { tokenSign } = require("../utils/handleJwt");

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
    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
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
    // Generar token JWT usando la función tokenSign
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
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
