const router = require('express').Router();
const express = require("express");
const Tutor=require('./../models/tutors');
const Student=require('./../models/students');

var imgModel = require('./../models/profile');
const auth =require('./../middleware/auth');



var multer = require('multer');
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
        cb(null, './../client/public/uploads/profiles/');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});



const upload = multer({ storage: storage ,fileFilter:imageFilter});


const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



var fs = require('fs');
var path = require('path');

router.post('/api/tutor/signup',function(req,res){

  const newuser=new Tutor(req.body);
  
 if(newuser.password!=newuser.password2)return res.status(400).json({message: "password not match"});
  
  Tutor.findOne({email:newuser.email},function(err,user){
      if(user) return res.status(400).json({ auth : false, message :"email exits"});
      
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user1 = new Tutor({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            city:req.body.city,
            country:req.body.country,
            password: hash,
            type:req.body.type,
            is_active:0,
            is_admin:0,

        });
        user1.save((err,doc)=>{
          if(err) {console.log(err);
              return res.status(400).json({ success : false,error:err});}
          res.status(200).json({
              success:true,
              message :"Tutor created successfully!",
              user : doc
          });
      });
      })
      
  });
});

router.post('/api/student/signup',function(req,res){

    const newuser=new Student(req.body);
    
   if(newuser.password!=newuser.password2)return res.status(400).json({message: "password not match"});
    
    Student.findOne({email:newuser.email},function(err,user){
        if(user) return res.status(400).json({ auth : false, message :"email exits"});
        
        bcrypt.hash(req.body.password, 10).then((hash) => {
          const user1 = new Student({
              first_name: req.body.first_name,
              last_name: req.body.last_name,

              email: req.body.email,
              city:req.body.city,
              country:req.body.country,
              //address:req.body.address,
              password: hash,
             // age:req.body.age,
              
          });
          user1.save((err,doc)=>{
            if(err) {console.log(err);
                return res.status(400).json({ success : false});}
            res.status(200).json({
                success:true,
                message :"Student created successfully!",
                user : doc
            });
        });
        })
        
    });
  });
  



router.post("/api/tutor/login", (req, res, next) => {
  let getUser;
  Tutor.findOne({
      email: req.body.email //, username:req.body.username
  }).then(user => {
      if (!user) {
          return res.status(401).json({
              message: "Authentication failed",
              success:false
          });
      }
      getUser = user;
      return bcrypt.compare(req.body.password, user.password);
  }).then(response => {
      if (!response) {
          return res.status(401).json({
              message: "Authentication failed",
              success:false
          });
      }
      let jwtToken = jwt.sign({
          email: getUser.email,
          userId: getUser._id
      }, "longer-secret-is-better", {
          expiresIn: "1h"
      });
      res.status(200).json({
          token: jwtToken,
          expiresIn: 3600,
          msg: getUser,
          success:true,
          message:"Login Successful"
      });
  }).catch(err => {
      return res.status(401).json({
          message: "Authentication failed",
          success:false
      });
  });
});




router.post("/api/student/login", (req, res, next) => {
    let getUser;
    Student.findOne({
        email: req.body.email //, username:req.body.username
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed",
                success:false
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed",
                success:false
            });
        }
        let jwtToken = jwt.sign({
            email: getUser.email,
            userId: getUser._id
        }, "longer-secret-is-better", {
            expiresIn: "100h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            msg: getUser,
            success:true,
            message:"Login Successful"
        });
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed",
            success:false
        });
    });
  });


router.post("/api/updateImg/:id",upload.single('file'),(req,res)=>{
    console.log(req.file);
    var newItem = new imgModel();
 newItem.img.data = fs.readFileSync(req.file.path)
 newItem.img.contentType = 'image/png';
 newItem.user_id=req.params.id;
 newItem.save();
 res.status(200).json(({
     success:true,
     data:newItem,
 }));


// const data = {
//     img: req.file.path
//    }
   
//    imgModel.create(data, (err, item) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//          item.save();
//         //res.redirect('/');
//     }
// })

})

router.get("/api/getAllImages/:id",(req,res)=>{

    console.log("hllo");

    imgModel.findOne({user_id:req.params.id}).then((obj)=>{
       // console.log(res);        //res.contentType(obj.contentType);
       res.contentType('json');
       res.send(obj);
        //res.json(obj.img.data);
        //res.json(obj);
    }).catch(err => {
        res.status(400).json(err);
    });


    })

//     imgModel.find({}, (err, items) => {
//         if (err) 
//             res.status(500).send('An error occurred', err);
        
//             // res.render('imagesPage', { items: items });
//             res.contentType(items.contentType);

// res.send(items.data);
      
//     });
//})


router.get("/api/tutor/getAll",auth, ({}, res) => {
  Tutor.find({}).then((users) => {
      res.json(users);
  }).catch(err => {
      res.status(400).json(err);
  });
});


router.get("/api/student/getAll",auth, ({}, res) => {
    Student.find({}).then((users) => {
        res.json(users);
    }).catch(err => {
        res.status(400).json(err);
    });
  });



  router.get("/api/tutor/:id",auth,(req,res)=>{
    Tutor.findOne({_id:req.params.id},(err,obj)=>{
        if(err) {console.log(err);
            return res.status(400).json({message:"Failed to get " ,success : false});}
     
            
    console.log(obj);
    res.status(200).json({
                success:true,
                data : obj
            });
    })
});

router.get("/api/student/:id",auth,(req,res)=>{
    Student.findOne({_id:req.params.id},(err,obj)=>{
        if(err) {console.log(err);
            return res.status(400).json({message:"Failed to get " ,success : false});}
     
            
    console.log(obj);
    res.status(200).json({
                success:true,
                data : obj
            });
    })
});

router.put("/api/tutorUpdate/:id",upload.single('file'),auth,(req,res)=>{
    Tutor.findOneAndUpdate({_id:req.params.id},{ first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        city:req.body.city,
        country:req.body.country,
       img:req.file.filename},{new: true},(err,obj)=>{
        if(err) {console.log(err);
            return res.status(400).json({message:"Failed to update " ,success : false});}
     
            res.status(200).json({
                success:true,
                message :"Profile updated successfully!",
                data : obj
            })

    })
})



router.put("/api/StudentUpdate/:id",(req,res)=>{
    Student.findOneAndUpdate({_id:req.params.id},req.body,{new: true},(err,obj)=>{
        if(err) {console.log(err);
            return res.status(400).json({message:"Failed to update " ,success : false});}
     
            res.status(200).json({
                success:true,
                message :"Profile updated successfully!",
                data : obj
            })

    })
})



module.exports = router;