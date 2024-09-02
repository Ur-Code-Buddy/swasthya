const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: String,
    message: String,
    doctor: String,
    timing: String,
    day: String
  });
  
const Appointment = mongoose.model("Appointments",appointmentSchema);
module.exports = Appointment;