const express = require('express')
const router = express.Router()
const logOutController = require('../../middleware/logOutController')

router.get('/',logOutController.handleLogOut)

module.exports = router;