require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const cors = require('cors');

const app = express();
app.use(cors()); // CORS for all routes

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI);

app.use('/swasthya/api', apiRoutes);

app.get('/keep-alive', (req, res) => {
  res.send('Server is awake and running.');
});

app.get("/", (req, res) => {
  console.log("Server is running.");
  res.send("Server is working.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
