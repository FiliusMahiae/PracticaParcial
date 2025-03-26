const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: Number, default: 0 }, // 0: no validado, 1: validado
  role: { type: String, default: "user" },
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
  // Logo
  logo: { type: String, default: "" },
  // Recuperación de contraseña
  passwordRecoveryCode: { type: String, default: "" },
});

// Se aplica el plugin para soft delete. Con { overrideMethods: "all" }
// se sobrescriben los métodos find, findOne, etc. para no devolver documentos borrados.
UserSchema.plugin(mongooseDelete, { overrideMethods: "all", deletedAt: true });

module.exports = mongoose.model("User", UserSchema);
