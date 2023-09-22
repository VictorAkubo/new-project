const express = require('express');
const router = express.Router();

const refreshToken = require('../../middleware/refreshTokenController')

router.get('/',refreshToken.handleRefreshToken)

module.exports = router;