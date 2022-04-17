var express = require('express');
var router = express.Router();
const commentController = require('../controllers/commentController');

//post request for sign up
router.post('/stories/:story_id/comments',commentController.postComment);


module.exports = router;
