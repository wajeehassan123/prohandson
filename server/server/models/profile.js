var mongoose=require('mongoose');
const confiq=require('../config/config').get(process.env.NODE_ENV);

const userProfileSchema=mongoose.Schema({

    img:
    {
        data: Buffer,
        contentType: String
    },
    user_id:{
        
        type: mongoose.Schema.Types.ObjectId,
    
        ref: 'User'
    }

})

module.exports=mongoose.model('Profile',userProfileSchema);