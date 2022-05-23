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

    try {
      const user = await User.findOne({ username: req.body.username });
      
      //check if user exists
      if(user===null) res.status(404).json('User does not exist!')
      
      //check if password is correct
      if(await bcrypt.compare(req.body.password,user.password)){
       jwt.sign({user},'secretkey',(err,token)=> {
       res.json({
        token
       })
     })
      
      } else {
        res.status(401).json({
        message: "Password is incorrect!!"})
      }

    } catch (err) {
      res.status(500).json(err);
    }
    

}