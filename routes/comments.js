var express = require('express');
var router = express.Router({mergeParams:true});
const commentController = require('../controllers/commentController');
const verifyToken = require('../config/verifyToken');


//post request for comment
router.post('/:id/comments',verifyToken,commentController.postComment);

//get request for comments
router.get('/:id/comments',commentController.GetComments);

//get request for a comment
router.get('/:id/comments/:commentId',commentController.commentModel);

//update request for a comment
router.put('/:id/comments/:commentId',verifyToken,commentController.updateComment);

//delete route
router.delete('/:id/comments/:commentId',verifyToken,commentController.deleteComment)

module.exports = router;
