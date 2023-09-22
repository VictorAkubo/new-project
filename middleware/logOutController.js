const userDB ={
    users: require('../data/users.json'),
    setUsers : function(data){this.users = data}
}
const fsPromises = require('fs/promises')
const path = require('path')
require('dotenv').config()


const handleLogOut =async (req,res)=>{
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204)

    const refreshToken = cookies.jwt;
    //is refresh token in db
    const foundUser = userDB.users.find((person)=> person.refreshToken === refreshToken)
    if(!foundUser) {
        res.clearCookie('jwt',{httpOnly:true})
        return res.sendStatus(204)//forbidden
    }
    //delete refresh token
    const otherUser = userDB.users.filter(person => person.refreshToken !== foundUser.refreshToken)
    const currentUser ={...foundUser,refreshToken:''}
    userDB.setUsers([...otherUser,currentUser])
    await fsPromises.writeFile(
        path.join(__dirname,'..','data','users.json'),
        JSON.stringify(userDB.users)
        );
    res.clearCookie('jwt',{httpOnly:true,sameSite:'none',secure:true,maxAge:24*60 *60 * 1000})
    res.sendStatus(204);
}
    
    
module.exports = { handleLogOut }