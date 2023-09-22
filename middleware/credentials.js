const allowedOrigin = require("../config/allowedOrigins")

const credentials = (req,res,next)=>{
    const origin = req.headers.origin
    if(allowedOrigin.includes(origin)){
        res.header('Access-Controller-Allow-Credentials',true)
    }
    next()
}
module.exports = credentials;