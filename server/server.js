const express = require("express");
const mongoose = require("mongoose");

const router = require('express').Router();
var multer = require('multer');
const cors = require('cors')
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './../client/public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage });


var fs = require('fs');
var path = require('path');
const logger = require("morgan");
//const url = "mongodb://localhost/workout";
const db=require('./config/config').get(process.env.NODE_ENV);
const bodyParser = require('body-parser')

const routes = require('./routes/user');
const routes1 = require('./routes/courses');

const routes2 = require('./routes/enroll');
const User=require('./models/user');
const {auth} =require('./middleware/auth');

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./../client/public"));
app.use(cors(corsOptions));

mongoose.Promise = global.Promise;
mongoose.connect(
  db.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) console.log(err);
    console.log("database is connected");
  }
);



//app.use(require("./routes/api.js"));
app.use(routes);
app.use(routes1);
app.use(routes2);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});
