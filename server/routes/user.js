const router = require('express').Router();
const express = require("express");
const Tutor=require('./../models/tutors');
const Student=require('./../models/students');

var imgModel = require('./../models/profile');
const auth =require('./../middleware/auth');


if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
  }
  const secretkey=process.env.STRIPE_SECRET_KEY
  console.log(secretkey);
const stripe = require("stripe")(secretkey);

var multer = require('multer');
router.use(express.static(__dirname+"./../client/build"))

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
        cb(null, '../client/build/uploads/profiles/');
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

router.post('/api/tutor/signup',async (req,res)=>{
let stripeId;
  const newuser=new Tutor(req.body);
  
 if(newuser.password!=newuser.password2)return res.status(400).json({message: "password not match"});
  
  Tutor.findOne({email:newuser.email},async (err,user)=>{
      if(user) return res.status(400).json({ auth : false, message :"email exits"});
      
      bcrypt.hash(req.body.password, 10).then(async (hash) => {
        const account = await stripe.accounts.create({
            type: 'express',
            country: "US",
            email: req.body.email,
            
            capabilities: {
              card_payments: {requested: true},
              transfers: {requested: true},
            },
        }).catch((err)=>{
            console.log(err);
                  })
                  stripeId=account.id;
                  console.log(stripeId);
                  const user1 = new Tutor({
                    
                    stripe_id:stripeId,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    city:req.body.city,
                    country:req.body.country,
                    password: hash,
                    type:req.body.type,
                    is_active:0,
                    is_admin:0,
                    stripe_payment_verified:false
        
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
        //   }).then(stripeId=account.id).then(()=>{
        //            console.log("Account")
                   
        //            console.log(stripeId)
               
        //       });
        //        }).catch(function(err) {
        //         res.json(err);
        //           });
        
      
      
  });
});

router.post('/api/student/signup',async function(req,res){

    const newuser=new Student(req.body);
    
   if(newuser.password!=newuser.password2)return res.status(400).json({message: "password not match"});
    
    Student.findOne({email:newuser.email},async function(err,user){
        if(user) return res.status(400).json({ auth : false, message :"email exits"});
        
        bcrypt.hash(req.body.password, 10).then(async (hash) => {
            const customer = await stripe.customers.create({
                email: req.body.email,
                name:req.body.first_name+req.body.last_name
              }).catch(function(err){
                  res.send(err);
              });
              console.log(customer);
              console.log(customer.id);
          const user1 = new Student({
            cust_id:customer.id,
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
    let obj={};
    if(req.file){
obj={
    first_name: req.body.first_name,
        
    last_name: req.body.last_name,
    email: req.body.email,
    city:req.body.city,
    country:req.body.country,
   img:req.file.filename
}

    }
    else{
        obj={
        first_name: req.body.first_name,
            
        last_name: req.body.last_name,
        email: req.body.email,
        city:req.body.city,
        country:req.body.country,
        }
    }
    console.log(obj)
    Tutor.findOneAndUpdate({_id:req.params.id},obj ,{new: true},(err,obj)=>{
        if(err) {console.log(err);
            return res.status(400).json({message:"Failed to update " ,success : false});}
     
            res.status(200).json({
                success:true,
                message :"Profile updated successfully!",
                data : obj
            })

    })
})



router.put("/api/StudentUpdate/:id",upload.single('file'),auth,(req,res)=>{
    let obj={};
    if(req.file){
obj={
    first_name: req.body.first_name,
        
    last_name: req.body.last_name,
    email: req.body.email,
    city:req.body.city,
    country:req.body.country,
   img:req.file.filename
}

    }
    else{
        obj={
        first_name: req.body.first_name,
            
        last_name: req.body.last_name,
        email: req.body.email,
        city:req.body.city,
        country:req.body.country,
        }
    }
    console.log(obj)
    Student.findOneAndUpdate({_id:req.params.id},obj,{new: true},(err,obj)=>{
        console.log(obj)
        if(err) {console.log(err);
            return res.status(400).json({message:"Failed to update " ,success : false});}
     
            res.status(200).json({
                success:true,
                message :"Profile updated successfully!",
                data : obj
            })

    })
})

router.put("/api/changePassword/:id",auth, (req, res, next) => {
    let getUser;
    Tutor.findOne({_id:req.params.id})
    .then(user => {
        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success:false
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.oldpassword, user.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Old password is not correct",
                success:false
            });
        }
        if(req.body.password!=req.body.password2)return res.status(400).json({message: "password not match"});
 
        bcrypt.hash(req.body.password, 10).then((hash) => {
            console.log(getUser);
            getUser.password=hash;
getUser.save((err,doc)=>{
    if(err) {console.log(err);
        return res.status(400).json({ success : false});}
    res.status(200).json({
        success:true,
        message :"password updated successfully!",
        user : doc
    });

        })

    })
       
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed",
            success:false,
            error:err
        });
    })


})



router.put("/api/changeStudentPassword/:id",auth, (req, res, next) => {
    let getUser;
    Student.findOne({_id:req.params.id})
    .then(user => {
        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success:false
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.oldpassword, user.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Old password is not correct",
                success:false
            });
        }
        if(req.body.password!=req.body.password2)return res.status(400).json({message: "password not match"});
 
        bcrypt.hash(req.body.password, 10).then((hash) => {
            console.log(getUser);
            getUser.password=hash;
getUser.save((err,doc)=>{
    if(err) {console.log(err);
        return res.status(400).json({ success : false});}
    res.status(200).json({
        success:true,
        message :"password updated successfully!",
        user : doc
    });

        })

    })
       
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed",
            success:false,
            error:err
        });
    })


})

router.get("/api/stripeAccountVerified/:id",async (req,res)=>{
    const accountLink = await stripe.accountLinks.create({
        account: req.params.id,
        refresh_url: 'http://prohandons.heroku.com/', //http://localhost:3000
         return_url: 'http://prohandons.heroku.com/addcourse',
        type: 'account_onboarding',
      });
      res.send(accountLink);
})

router.get("/api/stripeRetriveAccount/:id",async (req,res)=>{
    const account = await stripe.accounts.retrieve(
        req.params.id
      );
      res.send(account);
})







module.exports = router;