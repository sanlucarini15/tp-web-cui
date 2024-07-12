const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: { type: [String], default: [] } // Preferencias de contenido del usuario
});

module.exports = mongoose.model('User', userSchema);
