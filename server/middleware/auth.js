const jwt=require('jsonwebtoken');
const User=require('./../models/user');

module.exports =(req,res,next)=>{
    console.log(req.headers);
    try{
        var token=req.headers.authorization.split(" ")[1];
        var decode=jwt.verify(token,'longer-secret-is-better');
        req.userData=decode;
        next();
        
    }
    catch(err){
        res.status(401).json({
            message:"authorization failed!",
            error:"invalid token",
            err:err
        })
    }
    // let token =req.cookies.auth;
    // User.findByToken(token,(err,user)=>{
    //     if(err) throw err;
    //     if(!user) return res.json({
    //         error :true
    //     });

    //     req.token= token;
    //     req.user=user;
    //     next();

    // })
}
