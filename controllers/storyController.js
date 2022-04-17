const express = require('express');
const Story = require('../models/story');
const jwt = require("jsonwebtoken");



    exports.postStory = [
        (req, res, next) => {
        jwt.verify(req.token,'secretkey',(err,authData) => {
        if (err) return res.status(400).json(err);
            req.authData = authData;
            next();
           })
        },
        (req, res) => {
            const story = new Story({
                author:req.authData.user._id,
                title:req.body.title,
                text:req.body.text,
                dated:Date.now()
            }) 
         
            story.save(function(err){
                if(err){
                    res.json(err)
                }
                story.populate("author", (err, newStory) => {
                    if (err) return res.json(err);
                    return res.json({newStory});
                  });
                });
         }
]

exports.getStory = function(req,res,next){
    Story.findById(req.params.id)
    .populate('comments')
    .exec(function(err,story){
      if(err) return next(err);
      res.json({story:story})
  })
       
}

exports.getAllStories = function(req,res,next){
    Story.find({})
    .populate('author')
      .exec(function(err,stories){
          if(err){
              res.json({err})
          }
      res.json(stories)
     })

}

exports.updateStory = [
    (req, res, next) => {
        jwt.verify(req.token,'secretkey', (err, authData) => {
          if (err) return res.status(400).json(err);
          req.authData = authData;
          next();
        });
      },

      (req, res) => {
        const story = new Story({
            title: req.body.title,
            text: req.body.text,
            author: req.authData.user._id,
            dated: Date.now(),
            _id: req.params.id,
          });

Story.findByIdAndUpdate(req.params.id,story)
    .populate("author")
      .exec((err, updatedStory) => {
        if (err) return res.json(err);
        return res.json(updatedStory);
      });
}
]

exports.deleteStory = function(req,res){
    (req, res, next) => {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
          if (err) return res.status(400).json(err);
          req.authData = authData;
          next();
        });
      },

    Story.findByIdAndRemove(req.params.id,function(err){
        if(err) return res.json(err)
        res.json({message:'Story deleted successfully!'})
    })
}
  

     



