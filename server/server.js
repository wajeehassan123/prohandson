const express = require("express");
const mongoose = require("mongoose");

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const secretkey=process.env.STRIPE_SECRET_KEY
const publickey=process.env.STRIPE_PUBLIC_KEY


const stripe = require("stripe")(secretkey);

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
    cb(null, './../client/build/uploads')
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

const routes3 = require('./routes/rating');
const User=require('./models/user');
const {auth} =require('./middleware/auth');

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./../client/build"));
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

app.use(routes3);

if(process.env.NODE_ENV==="production"){

  app.use(express.static(path.join(__dirname,"../client/build")));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'..','client','build','index.html'));
  })
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});
