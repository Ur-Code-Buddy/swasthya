// const express = require("express");
// const path = require("path");

// const app = express();
// const port = 3000;

// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "index.html"));
// });

// app.listen(port, function() {
//     console.log(`Server is running on port ${port}`);
// });



// const express = require("express");
// const path = require("path");

// const app = express();
// const port = 3000;

// // Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, "public")));

// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "index.html"));
// });

// app.listen(port, function() {
//     console.log(`Server is running on port ${port}`);
// });



const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Serve the c-appointment page after login
app.get("/c-appointment", function(req, res) {
    res.sendFile(path.join(__dirname, "c-appointment.html"));
});

app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
});

