var mongoose=require('mongoose');
const confiq=require('../config/config').get(process.env.NODE_ENV);

const Tutor=require('./tutors');

const CoursesSchema=mongoose.Schema({
    name:{
        type:String,
    },
    rating:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    rating:{
        type:String
    },
    title:{
        type:String
    },
    category:{
type:String
    },
    img:
    {
        type: String
    },
    is_active:{
        type:Boolean
    },
    date_created:{
        type:Date
    },
    tutor_id:{
        
        type: mongoose.Schema.Types.ObjectId,
    
        ref: 'Tutor'
    },
    is_active:{
        type:Boolean
    }

})



module.exports=mongoose.model('Courses',CoursesSchema);