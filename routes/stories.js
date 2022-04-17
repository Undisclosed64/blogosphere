var express = require('express');
var router = express.Router();
const storyController = require('../controllers/storyController');
const verifyToken = require('../config/verifyToken');

//post request for story
router.post('/',verifyToken,storyController.postStory);

//get request for a single story
router.get('/:id',storyController.getStory)

//get all stories
router.get('/',storyController.getAllStories);

//post request for updating story
router.put('/:id',verifyToken,storyController.updateStory);

//delete request for story
router.delete('/:id',verifyToken,storyController.deleteStory);

module.exports = router;
