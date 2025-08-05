const express = require('express');
const router = express.Router();
const Controller = require('../module/user/user.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { singleUpload } = require('../middleware/multer');

// Protected routes
router.get('/profile', verifyToken, Controller.getProfile);
router.put('/profile',singleUpload, verifyToken, Controller.updateProfile);

module.exports = router;
