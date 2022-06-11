const Story = require('../models/story');
const jwt = require("jsonwebtoken");


//handler for story post 
    exports.postStory = [
      //verify token
        (req, res, next) => {
        jwt.verify(req.token,'secretkey',(err,authData) => {
        if (err){
          res.json({
            status:404,
            message:'Invalid token'
          })
        }
        req.auth_data = authData
         next()
        })
      },
      //define story
      (req, res) => {
        let story = new Story(req.body);
        story.author =  req.auth_data.user._id;
        story.dated = Date.now();
         
        //save story in try catch
        try {
          story.save();
          story.populate('author', 'username',(err,newStory)=> {
            if (err) return res.json(err);
            return res.json(
              {
                newStory
              });
          });
        //catch err
        } catch (err) {
          res.status(500).json(err);
        }
            }
  
]

//story view handler
exports.getStory = function(req,res,next){
  Story.deleteMany({})
    Story.findById(req.params.id)
    .populate('author','username')
    .populate('comments')
    .exec(function(err,story){
      if(err) return next(err);
      res.json({story:story})
  })
       
}

//get all stories
exports.getAllStories = function(req,res){
    Story.find({})
    .populate('author','username')
      .exec(function(err,stories){
          if(err){
              res.json({err})
          }
      res.json({stories:stories})
     })

}

//update story handler
exports.updateStory = [
    (req, res, next) => {
        jwt.verify(req.token,'secretkey', (err, authData) => {
          if (err) return res.status(400).json(err);
          req.authData = authData;
          next();
        });
      },

//define update story 
      (req, res) => {
        const story = new Story({
            title: req.body.title,
            text: req.body.text,
            author: req.authData.user._id,
            dated: Date.now(),
            comments:req.body.comments,
            _id: req.params.id,
          });

Story.findByIdAndUpdate(req.params.id,story,{new: true})
    .populate("author",'username')
      .exec((err, updatedStory) => {
        if (err) return res.json(err);
        return res.json({updatedStory});
      });
}
]

//delete handler for story
exports.deleteStory = function(req,res){
    (req, res) => {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
          res.json({
            status:404,
            message:'Invalid token'
          })
          req.authData = authData;
        });
      },

    Story.findByIdAndRemove(req.params.id,function(err){
        if(err){
          res.json(err)
        }
        res.json({
          message:'Story deleted successfully!'
        })
    })
}
  

     



