const express = require("express");
const router = require('express').Router();
const Tutor=require('./../models/tutors');
const Student=require('./../models/students');
const bodyParser = require('body-parser')

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
  }
  const secretkey=process.env.STRIPE_SECRET_KEY
const stripe = require("stripe")(secretkey);
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
    console.log(req.body);

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


router.post("/api/setAppointment",auth,(req,res)=>{
    const newqt=new Appointment(req.body);
    newqt.save((err,doc)=>{
        if(err) {console.log(err);
            return res.status(400).json({message:"error failed" ,success : false});}

        res.status(200).json({
            succes:true,
            message :"Dates added successfully!",
            data : doc
        });
    })

})

router.get("/api/getAppointment/:id",(req,res)=>{
    Appointment.findOne({tutor_id:req.params.id},(err,obj)=>{
        if(err) {console.log(err);
            return res.status(400).json({message:"error failed" ,success : false});}

        res.status(200).json({
            succes:true,
            message :"Dates id get successfully!",
            data : obj
        });
    })
})


router.post("/create-checkout-session", async (req, res) => {
    console.log(req.body);
    const loginLink = await stripe.accounts.createLoginLink(
        'acct_1Jg09OR7OhJlo8Cq'
      );
      console.log(loginLink)


    // const account = await stripe.accounts.create({
    //     type: 'custom',
    //     country: "US",
    //     email: req.body.email,
    //     capabilities: {
    //       card_payments: {requested: true},
    //       transfers: {requested: true},
    //     },
    //   });
    // const accountLink = await stripe.accountLinks.create({
    //     account: 'acct_1Jg09OR7OhJlo8Cq',
    //     refresh_url: 'https://example.com/reauth',
    //     return_url: 'https://example.com/return',
    //     type: 'account_onboarding',
    //   });
    const transfer = await stripe.transfers.create({
        amount: 100,
        currency: "usd",
        destination: "acct_1Jg09OR7OhJlo8Cq",
      });
      console.log(transfer);
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: "usd",
    //         product_data: {
    //           name: req.body.title,
    //         },
    //         unit_amount: req.body.price*100,
    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   mode: "payment",
    //   success_url: "http://localhost:3000/eachcourse",
    //   cancel_url: "http://localhost:3000/stripepaymentcancel",
    // }).catch(function(err) {
    //     res.json(err);
    //   });
            
    // res.json({ id: session.id });
  });

module.exports = router;