var mongoose=require('mongoose');
const Student=require('./students');
const Tutor=require('./tutors');
const Course=require('./courses');

const confiq=require('../config/config').get(process.env.NODE_ENV);

const EnrollSchema=mongoose.Schema({
    // tutor_id:{
        
    //     type: mongoose.Schema.Types.ObjectId,
    
    //     ref: 'Tutor'
    // },
    student_id:{
        type: mongoose.Schema.Types.ObjectId,
    
        ref: 'Student'

    },
    course_id:{
        type: mongoose.Schema.Types.ObjectId,
    
        ref: 'Course'
    }



});


module.exports=mongoose.model('Enroll',EnrollSchema);