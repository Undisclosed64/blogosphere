const User = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const user = require('../models/user');


exports.handleSignUp = function(req,res,next){
        let user = new User({
            username:req.body.username,
            password:req.body.password
        })
      
        bcrypt.hash(user.password,10,(error,securedPassword) => {
            if(error){
          return next(error)
            }
      
         user = new User({
          username: req.body.username,
          password: securedPassword,
          _id:user._id 
            })
      
      user.save(function(err){
        if(err){ 
          res.status(500).json(err);
      }
      res.status(200).json({user:user});
    })
      })
};

exports.handleSignIn = 
  async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      !user &&  res.status(401).json({
       message: "Incorrect Username",
       user,
      })
  
      const validated = await bcrypt.compare(req.body.password, user.password);
      !validated && res.status(401).json({
        message: "Incorrect password",
        user,
       })
    
      jwt.sign({
        _id: user._id, username: user.username
      },'secretkey',(err,token) => {
        if (err) return res.status(400).json(err);
        res.json({
          token:token,
          user:{_id: user._id, username: user.username }
        })
      })
  

    } catch (err) {

      res.status(500).json(err);
    }
    

}