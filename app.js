require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 8000;

//Middleware
app.use(bodyParser.json());
app.use(cookieParser());

//MongoDB Configuration
const DB = process.env.DB;

mongoose
  .connect(DB, {})
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch((err) => {
    console.log("Failed to connect");
  });

//Routes
const homeRoute = require("./routes/home");
app.use("/api", homeRoute);

const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const answerRoutes = require("./routes/answer");
app.use("/api", answerRoutes);

const userRoutes = require("./routes/user");
app.use("/api", userRoutes);

const questionRoutes = require("./routes/question");
app.use("/api", questionRoutes);

//listening
app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
