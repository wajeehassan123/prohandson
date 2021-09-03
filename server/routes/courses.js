const router = require('express').Router();
const Tutor=require('./../models/tutors');
const Student=require('./../models/students');

const Course=require('./../models/courses');

var imgModel = require('./../models/profile');
const auth =require('./../middleware/auth');


var multer = require('multer');

const upload = multer({ dest: 'uploads/' })

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



var fs = require('fs');
var path = require('path');


router.post("/api/tutor/addCourse",(req,res)=>{

    const newqt=new Course(req.body);

    newqt.save((err,doc)=>{
        if(err) {console.log(err);
            return res.status(400).json({message:"error failed" ,success : false});}
        res.status(200).json({
            succes:true,
            message :"Course added successfully!",
            user : doc
        });
    })
})


router.get("/api/courses/getAll", ({}, res) => {
    Course.find({}).then((users) => {
        res.json(users);
    }).catch(err => {
        res.status(400).json(err);
    });
  });


  router.get("/api/tutor/getCourse/:id",(req,res)=>{

Course.find({tutor_id:req.params.id},(err,obj)=>{
    if(err) {console.log(err);
         return res.status(400).json({message:"cannot find Course" ,success : false});}
        
    console.log(obj);
    res.status(200).json({
                succes:true,
                message :"Course get successfully!",
                data : obj
            });
    

})
  })