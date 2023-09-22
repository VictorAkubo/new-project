const {format} = require('date-fns')
const {v4:uuid} = require('uuid')
const fs = require('fs')
const fspromises = require('fs/promises')
const path = require('path')
const logEvent=(message,file)=>{
    const dir = path.join(__dirname,'logs')
    const date = format(new Date(), 'yy/MM/dd\tmm:HH:ss')
    try{
        if(!fs.existsSync(dir)){
            fspromises.mkdir(dir)
        }
        fspromises.appendFile(path.join(__dirname,'logs',file),`${uuid()} \t${date} ${message}\n `)
    }catch(err){
        console.log(err)
    }
    
}
module.exports = logEvent;