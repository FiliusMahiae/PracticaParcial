const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  verificationCode: { type: String },
  attempts: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", UserSchema);
