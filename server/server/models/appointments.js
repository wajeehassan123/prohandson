

var mongoose=require('mongoose');

const Tutor=require('./tutors');
const confiq=require('../config/config').get(process.env.NODE_ENV);


const AppointmentSchema=mongoose.Schema({
    

    date:{
        type:String
    },
    time:{
        type:String
    },
    tutor_id:{
        type: mongoose.Schema.Types.ObjectId,
        
            ref: 'Tutor'
    },
    isReserved:{
        type:Boolean
    }
    })

    
module.exports=mongoose.model('Appointment',AppointmentSchema);