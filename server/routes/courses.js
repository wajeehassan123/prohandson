const express = require("express");
const router = require('express').Router();
const Tutor=require('./../models/tutors');
const Student=require('./../models/students');



var fs = require('fs');
var path = require('path');
const Course=require('./../models/courses');

const auth =require('./../middleware/auth');

router.use(express.static(__dirname+"./../client/public"))

var multer = require('multer');
const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './../client/public/uploads/');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});



const upload = multer({ storage: storage ,fileFilter:imageFilter});

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



router.post("/api/tutor/addCourse",upload.single('file'),auth,(req,res)=>{

    const newqt=new Course();
    newqt.title=req.body.title;
    newqt.price=req.body.price;
    newqt.description=req.body.description;
    newqt.category=req.body.category;
    newqt.img = req.file.filename;
    newqt.tutor_id=req.body.tutor_id;
    newqt.name=req.body.name;

    newqt.save((err,doc)=>{
        if(err) {console.log(err);
            return res.status(400).json({message:"error failed" ,success : false});}

        res.status(200).json({
            succes:true,
            message :"Course added successfully!",
            data : doc
        });
    })
})


router.get("/api/courses/getAll", ({}, res) => {
    Course.find({}).populate("tutor_id").then((users) => {
        //console.log(users[0].img)
        
        // const b64 = Buffer.from(users[0].img.data.buffer).toString('base64');
        // res.json(b64);
        
        res.json(users);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
  });


  router.get("/api/tutor/getCourse/:id",auth,(req,res)=>{

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


  
  router.get("/api/course/getCourse/:id",(req,res)=>{

    Course.findById(req.params.id,(err,obj)=>{
        if(err) {console.log(err);
             return res.status(400).json({message:"cannot find Course" ,success : false});}
            
        console.log(obj);
        res.status(200).json({
                    succes:true,
                    message :"Course get successfully!",
                    data : obj
                });
        
    
    }).populate("tutor_id")
      })
    
      



  router.get("/api/tutor/getCourseByCategory/:id",(req,res)=>{

    Course.find({category:req.params.id},(err,obj)=>{
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


      router.get("/api/tutor/getCourseByTitle/:id",(req,res)=>{

        Course.find({title:{ $regex: req.params.id, $options: 'i' }},{img:0},(err,obj)=>{
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
  
module.exports = router;