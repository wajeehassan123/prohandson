const config={
    production :{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default : {
        SECRET: 'mysecretkey',
        DATABASE: 'mongodb+srv://prohandson:prohandson@cluster0.nwthj.mongodb.net/prohandson?retryWrites=true&w=majority'
    }
}


exports.get = function get(env){
    return config[env] || config.default
}