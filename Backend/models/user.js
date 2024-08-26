const mongoose = require('mongoose');

const roles = ['ADMIN', 'USER', 'INVITED'];

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: { type: [String], default: [] },
  role: { type: String, enum: roles, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
