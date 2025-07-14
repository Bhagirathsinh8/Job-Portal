const express =require('express');
const router = express.Router();
const authController = require('../module/auth/auth.controller');


router.get('/welcome',authController.welcome);
router.post('/signup',authController.signup);
router.post('/login',authController.login);

module.exports = router;