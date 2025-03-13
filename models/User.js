const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: Number, default: 0 }, // 0: no validado, 1: validado
  role: { type: String, default: "user" }, // Por ejemplo, "user" o "autonomo"
  verificationCode: { type: String },
  attempts: { type: Number, default: 3 },
  // Datos personales
  nombre: { type: String, default: "" },
  apellidos: { type: String, default: "" },
  nif: { type: String, default: "" },
  // Datos de la compañía
  companyName: { type: String, default: "" },
  cif: { type: String, default: "" },
  direccion: { type: String, default: "" },
});

module.exports = mongoose.model("User", UserSchema);
