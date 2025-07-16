const express = require('express');
const router = express.Router();
const Controller = require('../module/user/user.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Protected routes
router.get('/profile', verifyToken, Controller.getProfile);
router.put('/profile', verifyToken, Controller.updateProfile);

module.exports = router;
