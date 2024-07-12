const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  description: { type: String, required: true },
  doctor: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  appointments: [appointmentSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
