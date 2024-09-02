const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: String,
  message: String,
  doctor: String,
  timing: String,
  day: String
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  appointments: [appointmentSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
