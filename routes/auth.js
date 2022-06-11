var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../config/verifyToken');


//post request for sign up
router.post('/sign-up',authController.handleSignUp);

//post request for login
router.post('/sign-in',authController.handleSignIn);


//post request for login
router.get('/user',verifyToken,authController.getUser);



module.exports = router;
