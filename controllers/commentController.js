const Comment = require('../models/comment');
const Story = require("../models/story");



exports.postComment = function(req,res){

    const comment = new Comment(
        {
          username:req.body.username,
          comment:req.body.comment,
          timeStamp:Date.now(),
          storyId:req.params.story_id
        }
    )
    comment.save(function(err){
        if(err){
            res.json(err)
        } else {
        res.status(200).json(comment);
        }
    })
}