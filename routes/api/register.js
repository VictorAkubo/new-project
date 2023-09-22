const express = require('express')
const router = express.Router()
const registerController = require('../../middleware/registerController')

router.post('/',registerController.handleNewUser)
module.exports = router;