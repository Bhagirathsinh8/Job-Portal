const express =require('express');
const router = express.Router();
const Controller = require('../module/auth/auth.controller');
const Validator = require('../module/auth/auth.validation');
const { singleUpload } = require('../middleware/multer');


router.get('/welcome',Controller.welcome);
router.post('/signup',singleUpload, Validator.signupValidator, Controller.signup);
router.post('/login',Validator.loginValidator,Controller.login);

module.exports = router;