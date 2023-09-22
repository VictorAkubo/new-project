const fspromises = require('fs/promises')
const fs = require('fs')
const { UTF8 } = require('mysql/lib/protocol/constants/charsets')
const path = require('path')
/**fs.readFile(path.join(__dirname,'files','text.txt'),'utf-8',(err,data)=>{

    if(err) throw err
    fs.writeFile(path.join(__dirname,'files','write.txt'),data,(err)=>{
        console.log('file written')
        if(err) throw err
        fs.appendFile(path.join(__dirname,'files','write.txt'),'\nnew file written',(err)=>{
            console.log('file appended')
            if(err) throw err
            fs.unlink(path.join(__dirname,'files','text.txt'),(err)=>{
                console.log('file unlinked')
                if(err) throw err
            })
        })
    })

})

console.log('hello...')
process.on('uncaughtException',err=>{
    console.error(`they was an uncaught error: ${err}`)
    process.exit(1)
})
const fileOperation = async ()=>{
    try{
        await fspromises.writeFile(path.join(__dirname,'files','write.txt'),'data has been written into this txt')
        let read = await fspromises.readFile(path.join(__dirname,'files','write.txt'),'UTF8')
        await fspromises.appendFile(path.join(__dirname,'files','append.txt'),read)
        await fspromises.rename((path.join(__dirname,'files','write.txt')),(path.join(__dirname,'files','newWrite.txt')))
        /*await fspromises.unlink(path.join(__dirname,'files','write.txt'))
    }catch(err){
        console.log(err)
    }
    

}
fileOperation()

const dir = path.join(__dirname,'files','new')
if(!fs.existsSync(dir)){
    fspromises.mkdir(path.join(__dirname,'files','new'),(err)=>{
        console.log(err)
    })
    const read = fs.createReadStream(path.join(__dirname,'files','append.txt'),{encoding:'utf-8'})
    const write = fs.createWriteStream(path.join(__dirname,'files','new','write.txt'))
    read.on('data',(data)=>{
        write.write(data)
    
   
})
}
async  function victor(){
    if(fs.existsSync(dir)){
        await fspromises.unlink(path.join(__dirname,'files','new','write.txt'))
        fs.rmdir(path.join(__dirname,'files','new'),(err)=>{
            console.log(err)
        })
    }
}
victor()




**/

