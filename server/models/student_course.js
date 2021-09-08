var mongoose=require('mongoose');
const confiq=require('../config/config').get(process.env.NODE_ENV);

const StudentCourseSchema=mongoose.Schema({
    tutor_id:{
        
        type: mongoose.Schema.Types.ObjectId,
    
        ref: 'Tutor'
    },
    student_id:{
        type: mongoose.Schema.Types.ObjectId,
    
        ref: 'Student'

    },
    course_id:{
        type: mongoose.Schema.Types.ObjectId,
    
        ref: 'Course'
    }



});


module.exports=mongoose.model('StudentCourse',StudentCourseSchema);