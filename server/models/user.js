var mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const confiq=require('../config/config').get(process.env.NODE_ENV);
const salt=10;

const userSchema=mongoose.Schema({
    first_name:{
        type: String,
        required: true,
        maxlength: 100
    },
    last_name:{
        type: String,
        required: true,
        maxlength: 100
    },
     email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    city:{
        type: String,
        //required: true,
        
    },
    country:{
        type: String,
        //required: true,
        
    },
    address:{
        type: String,
        //required: true,
        
    },
    

    password:{
        type:String,
        required: true,
        minlength:8
    },
    password2:{
        type:String,
        minlength:8

    },
    token:{
        type: String
    },
    type:{
type:String
    },
    is_admin:{
        type:Boolean
    },
    is_active:{
        type:Boolean,

    }
});

module.exports=mongoose.model('User',userSchema);


userSchema.pre('save',function(next){
    var user=this;
    
    if(user.isModified('password')){
        bcrypt.genSalt(salt,function(err,salt){
            if(err)return next(err);

            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password=hash;
                user.password2=hash;
                next();
            })

        })
    }
    else{
        next();
    }
});

userSchema.methods.comparepassword=function(password,cb){
    bcrypt.compare(password,this.password,function(err,isMatch){
        if(err) return cb(next);
        cb(null,isMatch);
    });
}


userSchema.methods.generateToken=function(cb){
    var user =this;
    var token=jwt.sign(user._id.toHexString(),confiq.SECRET);

    user.token=token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}