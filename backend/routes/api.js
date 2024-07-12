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
    const appointmentData = appointmentSchema.parse(req.body);
    console.log(appointmentData);
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

module.exports = router;
