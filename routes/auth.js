var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');

//post request for sign up
router.post('/sign-up',authController.handleSignUp);

//post request for login
router.post('/sign-in',authController.handleSignIn);

module.exports = router;
