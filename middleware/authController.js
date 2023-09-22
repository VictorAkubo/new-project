
const userDB = {
    users: require('../data/users.json'),
    setUsers: function (data) { this.users = data }
}
const jwt = require('jsonwebtoken')
require('dotenv').config()
const fsPromises = require('fs/promises')
const path = require('path')
const handleLogin = async (req, res) => {
    const user = req.body.user;
    const pwd = req.body.pwd;
    if (!user || !pwd) return res.status(400).json({ "message": "username and password required" })
    const foundUser = userDB.users.find((person) => person.username === user)
    if (!foundUser) return res.sendStatus(401)

    const match = await pwd === foundUser.password
    if (match) {
        const roles = Object.values(foundUser.roles);
        //create jwt
        const accessToken = jwt.sign(
            {
                "UserInfo":
                {
                    'username': foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }

        )
        const refreshToken = jwt.sign(
            { 'username': foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }

        )
        const otherUsers = userDB.users.filter(person => person.username !== foundUser.username)
        const currentUser = { ...foundUser, refreshToken }
        userDB.setUsers([...otherUsers, currentUser])
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'data', 'users.json'),
            JSON.stringify(userDB.users)
        )
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 })
        return res.json({ accessToken })
    } else {
        res.sendStatus(401);
    }
}
module.exports = { handleLogin }