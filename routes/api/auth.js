const express = require('express')
const router = express.Router()
const authController = require('../../middleware/authController')

router.post('/',authController.handleLogin)
module.exports = router;