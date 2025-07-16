const express =require('express');
const router = express.Router();
const Controller = require('../module/auth/auth.controller');
const Validator = require('../module/auth/auth.validation');


router.get('/welcome',Controller.welcome);
router.post('/signup', Validator.signupValidator, Controller.signup);
router.post('/login',Validator.loginValidator,Controller.login);

module.exports = router;