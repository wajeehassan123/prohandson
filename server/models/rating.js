var mongoose=require('mongoose');
const Student=require('./students');
const Tutor=require('./tutors');
const Course=require('./courses');
const Enroll=require('./rating');
const confiq=require('../config/config').get(process.env.NODE_ENV);

const RatingSchema=mongoose.Schema({

    message:{type:String},
    rate:{type:Number},
    date:{type:Date},
    student_id:{
        type: mongoose.Schema.Types.ObjectId,
    
        ref: 'Student'
    },
    course_id:{
        type: mongoose.Schema.Types.ObjectId,
    
        ref: 'Courses'
    }

});



module.exports=mongoose.model('Rating',RatingSchema);

