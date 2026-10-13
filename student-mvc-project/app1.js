const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// CORS
app.use(cors());

// JSON
app.use(express.json());

// MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => {
    console.log("mongodb conected");
  })
  .catch((err) => {
    console.log(err);
  });

// Routes
const studentRoutes1 = require("./routes/student1");

app.use("/student", studentRoutes1);

// Home
app.get("/", (req, res) => {
  res.send("server is running");
});

// Server
app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});