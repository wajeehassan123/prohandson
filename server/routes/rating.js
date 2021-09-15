const express = require("express");
const router = require('express').Router();
const Tutor=require('./../models/tutors');
const Student=require('./../models/students');
const bodyParser = require('body-parser')
const Rating=require('./../models/rating');
const Enroll=require('./../models/enroll');

var fs = require('fs');
var path = require('path');
const Course=require('./../models/courses');

const auth =require('./../middleware/auth');

router.use(express.static(__dirname+"./../client/public"));
router.use(bodyParser.urlencoded({
    extended: true
  }));

  router.post("/api/course/rating",(req,res)=>{

    const rating=new Rating(req.body);
    rating.save((err,doc)=>{
        if(err) {console.log(err);
            return res.status(400).json({message:"error failed" ,success : false});}

            res.status(200).json({
                succes:true,
                message :"rated successfully!",
                data : doc
            });
    })

  })

  router.get("/api/courses/getReviews/:id",(req,res)=>{
    Rating.findOne({course_id:req.params.id})
    .populate("student_id")
    .then(function(dbProduct) {

      res.json(dbProduct);
          })
          .catch(function(err) {
              res.json(err);
            });
  })


  

module.exports = router;
