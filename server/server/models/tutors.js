var mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const { Timestamp } = require('mongodb');
const confiq=require('../config/config').get(process.env.NODE_ENV);
const salt=10;

const tutorSchema=mongoose.Schema({
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
    age:{
        type:Number,
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
    img:
    {
        type:String
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


module.exports=mongoose.model('Tutor',tutorSchema);
