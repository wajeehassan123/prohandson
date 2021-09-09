const express = require("express");
const router = require('express').Router();
const Tutor=require('./../models/tutors');
const Student=require('./../models/students');

const Enroll=require('./../models/enroll');

var fs = require('fs');
var path = require('path');
const Course=require('./../models/courses');

const auth =require('./../middleware/auth');

router.use(express.static(__dirname+"./../client/public"));

router.post("/api/student/enroll/",(req,res)=>{

    const enroll=new Enroll();
    enroll.student_id=req.body.student_id;
    enroll.course_id=req.body.course_id;
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

router.get("/api/course/getEnrolled/:id",(req,res)=>{
    Enroll.find({student_id:req.params.id})
    .populate("course_id")
    .then(function(dbProduct) {
res.json(dbProduct);
    })
    .catch(function(err) {
        res.json(err);
      });
            
})


module.exports = router;