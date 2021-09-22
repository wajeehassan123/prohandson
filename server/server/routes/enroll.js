const express = require("express");
const router = require('express').Router();
const Tutor=require('./../models/tutors');
const Student=require('./../models/students');
const bodyParser = require('body-parser')

const Enroll=require('./../models/enroll');

const Appointment=require('./../models/appointments');

var fs = require('fs');
var path = require('path');
const Course=require('./../models/courses');

const auth =require('./../middleware/auth');

router.use(express.static(__dirname+"./../client/public"));
router.use(bodyParser.urlencoded({
    extended: true
  }));

router.post("/api/student/enroll",auth,(req,res)=>{
    
    const enroll=new Enroll(req.body);
    // enroll.student_id=req.body.student_id;
    // enroll.course_id=req.body.course_id;
    enroll.save((err,doc)=>{
        if(err) {console.log(err);
            return res.status(400).json({message:"error failed" ,success : false});}

        res.status(200).json({
            succes:true,
            message :"Enrolled successfully!",
            data : doc
        });
    })
})

router.get("/api/course/getEnrolled/:id",auth,(req,res)=>{
    Enroll.find({student_id:req.params.id,is_active:false})
    .populate("course_id")
    .populate("student_id")
    .populate("tutor_id")
    .then(function(dbProduct) {

res.json(dbProduct);
    })
    .catch(function(err) {
        res.json(err);
      });
            
})



router.get("/api/enroll/getStudentCourse/:id/:course_id",auth,(req,res)=>{
//    console.log(req.params);
    Enroll.findOne({student_id:req.params.id,course_id:req.params.course_id})
    .populate("course_id")
    .populate("student_id")
    .populate("tutor_id")
    .then(function(dbProduct) {

res.json(dbProduct);
    })
    .catch(function(err) {
        res.json(err);
      });
            
})



router.get("/api/tutor/getEnrolled/:id",auth,(req,res)=>{
    Enroll.find({tutor_id:req.params.id})
    .populate("course_id")
    .populate("student_id")
    .populate("tutor_id")
    .then(function(dbProduct) {

res.json(dbProduct);
    })
    .catch(function(err) {
        res.json(err);
      });
            
})

router.put("/api/enroll/markAsComplete/:id/:course_id",auth,(req,res)=>{
    Enroll.findOneAndUpdate({student_id:req.params.id,course_id:req.params.course_id},{is_active:true},{new:true,useFindAndModify: false},(err,doc)=>{
        if(err) {console.log(err);
            return res.status(400).json({message:"Cannot mark as completed " ,success : false});}
     
            res.status(200).json({
                success:true,
                message :"Course completed successfully!",
                data : doc
            })

    })
})



router.post("/api/tutor/appointment",auth,(req,res)=>{
    const newAppoint=new Appointment(req.body)
    newAppoint.save((err,doc)=>{
    if(err) {console.log(err);
        return res.status(400).json({message:"error failed" ,success : false});}

    res.status(200).json({
        succes:true,
        message :"Appointed successfully!",
        data : doc
    });
})
})

router.get("/api/getAppointment/:id",(req,res)=>{
    Appointment.find({tutor_id:req.params.id,isReserved:true},(err,obj)=>{
        if(err) {console.log(err);
            return res.status(400).json({message:"Couldn't find" ,success : false});}
           
       console.log(obj);
       res.status(200).json({
                   succes:true,
                   message :"Dates Times successfully get",
                   data : obj
               });
    }).populate("tutor_id")
})

// router.put("/api/TutorReserved/:id")


module.exports = router;