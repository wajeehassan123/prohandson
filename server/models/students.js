var mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const confiq=require('../config/config').get(process.env.NODE_ENV);
const salt=10;

const StudentSchema=mongoose.Schema({
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
        type:Number
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
    img:
    {
        data: Buffer,
        contentType: String
    },
    is_admin:{
        type:Boolean
    },
    is_active:{
        type:Boolean,

    },
    cust_id:{
        type:String
    }
});

module.exports=mongoose.model('Student',StudentSchema);
