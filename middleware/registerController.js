
const userDB = {
    users: require('../data/users.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs/promises')
const path = require('path')
//const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
    const user = req.body.user;
    const pwd = req.body.pwd;
    if (!user || !pwd) return res.json({ "message": "username and password required" })
    const duplicate = userDB.users.find(person => person.username === user)
    if (duplicate) {
        return res.status(401).json({ "message": `Username ${user} already exist` })
    }
    try {
        //hashing of password
        //const hashedpwd = await crypto.hash(pwd)
        const newUser = { 
            "username": user,
            "roles":{"User":2001},
            "password": /*hashed*/pwd }
        userDB.setUsers([...userDB.users, newUser])
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'data', 'users.json'),
            JSON.stringify(userDB.users)
        )
        console.log(userDB.users)
        res.status(200).json({ "Success": `new user ${user} created` })

    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}
module.exports = { handleNewUser }