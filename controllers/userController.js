// controllers/userController.js
const User = require("../models/User");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return handleHttpError(res, "El usuario ya existe.", 409);
    }
    const hashedPassword = await encrypt(password);
    const verificationCode = generateVerificationCode();
    const user = new User({
      email,
      password: hashedPassword,
      verificationCode,
      attempts: process.env.MAX_ATTEMPTS || 3,
    });
    await user.save();
    const token = await tokenSign(user);
    return res.json({
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
    return handleHttpError(res, "Error interno del servidor", 500);
  }
};

const validateEmail = async (req, res) => {
  const { code } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return handleHttpError(res, "Usuario no encontrado", 404);
    }
    if (user.verificationCode === code) {
      user.status = 1; // Usuario validado
      user.verificationCode = null; // Opcional: limpiar el código
      await user.save();
      return res.json({ message: "Email validado correctamente" });
    } else {
      // Código incorrecto: decrementa los intentos
      if (user.attempts > 0) {
        user.attempts = user.attempts - 1;
      }
      await user.save();
      if (user.attempts <= 0) {
        return handleHttpError(res, "Número máximo de intentos alcanzado", 403);
      }
      return handleHttpError(
        res,
        `Código inválido. Quedan ${user.attempts} intentos`,
        400
      );
    }
  } catch (error) {
    console.error(error);
    return handleHttpError(res, "Error interno del servidor", 500);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return handleHttpError(res, "Credenciales incorrectas", 400);
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return handleHttpError(res, "Credenciales incorrectas", 400);
    }
    const token = await tokenSign(user);
    return res.json({
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
    return handleHttpError(res, "Error interno del servidor", 500);
  }
};

module.exports = { register, validateEmail, login };
