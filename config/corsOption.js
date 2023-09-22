const allowedOrigin = require('./allowedOrigins')
const corsOptions = {
    origin:(origin,callback)=>{
        if(allowedOrigin.indexOf(origin) !== -1 || !origin){
            callback(null,true)
        }else{
            callback(new Error('not allowed by cors'))
        }
    }
}
module.exports = corsOptions