const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { z } = require('zod');

// Zod schemas
const userSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

const appointmentSchema = z.object({
  date: z.string().refine(val => !isNaN(Date.parse(val)), "Invalid date format"),
  description: z.string().min(1),
  doctor: z.string().min(1)
});

// Middleware for authentication
const authenticate = async (req, res, next) => {
  const { username, password } = req.headers;
  try {
    // Find the user by username and password
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// API1: Create new user
router.post('/register', async (req, res) => {
  try {
    const userData = userSchema.parse(req.body);

    // Save the user with plain text password
    const user = new User(userData);
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send({ error: error.errors || error.message });
  }
});

// API2: Add appointment
router.post('/appointments', authenticate, async (req, res) => {
  try {
    // Extract the data from the request body
    const { name, message, doctor, timing, day } = req.body;

    // Validate required fields
    if (!name || !message || !doctor || !timing || !day) {
      return res.status(400).send({ error: 'All fields are required.' });
    }

    // Create the appointment data object
    const appointmentData = {
      name,
      message,
      doctor,
      timing,
      day
    };

    // Push the appointment data to the user's appointments array
    req.user.appointments.push(appointmentData);
    await req.user.save();

    res.status(201).send({ message: 'Appointment added successfully' });
  } catch (error) {
    res.status(400).send({ error: error.errors || error.message });
  }
});


// API3: Fetch appointments
router.get('/appointments', authenticate, (req, res) => {
  res.status(200).send(req.user.appointments);
});

// API4: Fetch all appointments for a doctor
router.get('/doctor-appointments', async (req, res) => {
  const doctorCredentials = {
    username: 'doctorUsername', // Replace with actual username
    password: 'doctorPassword'  // Replace with actual password
  };

  const { username, password } = req.headers;

  if (username !== doctorCredentials.username || password !== doctorCredentials.password) {
    return res.status(401).send({ message: 'Invalid credentials' });
  }

  try {
    const usersWithAppointments = await User.find({ 'appointments.doctor': username });

    const doctorAppointments = usersWithAppointments.reduce((appointments, user) => {
      const userAppointments = user.appointments.filter(app => app.doctor === username);
      return appointments.concat(userAppointments);
    }, []);

    res.status(200).send(doctorAppointments);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// API5: Verify if a user exists
router.post('/verify-user', async (req, res) => {
  try {
    const { username, password } = req.headers;
    console.log(username, password);

    // Check if the user exists with the given username and password
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).send({ success: true, message: 'User exists' });
    } else {
      res.status(404).send({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
