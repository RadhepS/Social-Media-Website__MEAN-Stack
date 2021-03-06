const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user')

const app = express();

mongoose.connect('mongodb+srv://rad:' + process.env.MONGO_ATLAS_PW + '@cluster0-ge6uo.mongodb.net/node-angular?retryWrites=true', { useNewUrlParser: true })
  .then(() => {
    console.log('connected to database!');
  })
  .catch(error => {
    console.log('Connection failed: ' + error);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use("/images", express.static(path.join("" + process.env.IMAGES_FOLDER)));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
