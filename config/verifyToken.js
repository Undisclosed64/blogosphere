//verify token
function verifyToken(req,res,next){
  //get auth header
  const bearerHeader = req.headers['authorization'];
  //check if bearer is undefined
  if(typeof bearerHeader !== 'undefined'){
 // Split at the space
 const bearer = bearerHeader.split(" ");
 // Get token from array
 const bearerToken = bearer[1];
 // Set the token
 req.token = bearerToken;
 // Next middleware

 next();
 
  } else {
      //forbidden
      res.sendStatus(403);
  }

}

module.exports = verifyToken;
