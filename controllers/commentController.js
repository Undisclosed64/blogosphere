const Comment = require('../models/comment');
const Story = require("../models/story");
const jwt = require("jsonwebtoken");



//handler for posting comment
exports.postComment =  [
    (req, res, next) => {
    jwt.verify(req.token,'secretkey',(err,authData) => {
        if (err){
            res.status(403).json(err);
        } 
        req.auth_data = authData
        next()
    })
},
(req, res) => {
    const comment = new Comment({
        username:req.auth_data.user.username,
        comment:req.body.comment,
        timeStamp:new Date()
    })
    comment.save();
    
    Story.findById(req.params.id,function(err,story){
        if(err){res.json(err)}
        story.comments.push(comment);
        story.save()
        res.json({comment:comment})
    })
}
]

//handler for retrieving comments
exports.GetComments = function(req,res){
  Story.findById(req.params.id)
  .populate('comments')
  .exec(function(err,story){
  if(err){
    res.json(err)
  }
   res.json({comments:story.comments})
  })
}

//handler for a model comment
exports.commentModel = function(req,res){
    Comment.findById(req.params.commentId,function(err,comment){
        if(err){
            res.json(err)
        }
        res.json({comment:comment})
    })
}


//update comment handler
exports.updateComment = [
    
    (req, res, next) => {
        console.log(req.params)
        jwt.verify(req.token,'secretkey',(err,authData) => {
            if (err){
                res.status(403).json(err);
            } 
            req.auth_data = authData
            next()
        })
    },
    (req, res) => {
        const comment = new Comment({
            username:req.auth_data.user.username,
            comment:req.body.comment,
            timeStamp:new Date(),
            _id:req.params.commentId
        })
        Comment.findByIdAndUpdate(req.params.commentId,comment,{new:true})
       .exec((err,updatedComment)=>{
            if(err){
                res.json(err)
            }
            res.json({updatedComment:updatedComment})
        });
    }
]


//delete comment handler
exports.deleteComment = function(req,res){
    (req, res) => {
        jwt.verify(req.token,'secretkey',(err,authData) => {
            if (err){
                res.json({
                    status:404,
                    message:'Invalid token'
                  }) 
            } 
            req.auth_data = authData
        })
    },

    Story.findById(req.params.id)
    .exec(function(err,story){
        if(err){
            res.json(err);
        }  

     Comment.findByIdAndDelete(req.params.commentId,function(err){
         if(err){
             res.json(err)
         }
         story.comments.pull({_id:req.params.commentId});
         story.save();
         res.json({
             message:'Comment deleted!'
            })
           
     })
    })
}