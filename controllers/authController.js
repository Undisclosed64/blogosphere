const User = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


//sign up controller
exports.handleSignUp = function(req,res){
  let user = new User({
    username:req.body.username,
    password:req.body.password
  })
  //secure the password
  bcrypt.hash(user.password,10,(err,hashedPassword) => {
    if(err){
     return res.json(err)
    }

    //define user with hashed password
    user = new User({
      username:req.body.username,
      password:hashedPassword,
      _id:user._id
    })

    //save and return
    user.save(function(err){
      if(err){
      res.status(500).json(err)
      }

    res.status(201).json({created_user:user})
    })
  })

};


exports.handleSignIn = 
  async (req, res) => {

      const user = await User.findOne({ username: req.body.username });
      
      //check if user exists
      if(user===null) res.json({
        status:404,
        message:'User does not exist!'})
      
      //check if password is correct
      if(await bcrypt.compare(req.body.password,user.password)){
       jwt.sign({user},'secretkey',(err,token)=> {
       res.json({
         user,
        token
       })
     })
      
      } else {
        res.json({
        status:401,
        message: "Password is incorrect!!"})
      }

    } 
    
exports.getUser = [
  (req, res) => {
    jwt.verify(req.token,'secretkey', (err, authData) => {
      if (err) return res.json({
        message:'User not verified',
        status:401
      });
      res.json(authData)
    });
  },

]

