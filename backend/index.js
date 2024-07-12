const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors()); //CORS for all routes

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:baivab2002@cluster0.ezuvzvl.mongodb.net/swasthya', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api', apiRoutes);

app.get('/keep-alive', (req, res) => {
    res.send('Server is awake and running.');
  });

app.get("/",(req,res) => {
    console.log("keeping alive")
    res.send("working")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});