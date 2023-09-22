const express = require('express')
const app = express()
const PORT = 3500
const path = require('path')
const logEvent = require('./logEvent')
const router = express.Router()
const cors = require('cors')
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser')
const credentials = require('./middleware/credentials')
const corsOptions = require('./config/corsOption')
app.use((req,res,next)=>{
    logEvent(`${req.method}\t${req.headers?.origin}${req.url}`,'request.txt')
    console.log(`${req.method}\t${req.path}`)
    next()
})
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())


app.use('/',express.static(path.join(__dirname,'public')))

app.use('/dir',require('./routes/index.js'))

app.use('/register',require('./routes/api/register.js'))
app.use('/auth',require('./routes/api/auth.js'))
app.use('/refresh',require('./routes/api/refresh'))
app.use('/logout',require('./routes/api/logout.js'))


app.use(verifyJWT)
app.use('/employees',require('./routes/api/employees.js'))




app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','404.html'))
})

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
