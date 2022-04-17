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
/* "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyNTViOWUzZDc4NWJmOTViY2M1ZGQ0ZiIsInVzZXJuYW1lIjoiSm9obiIsInBhc3N3b3JkIjoiJDJhJDEwJFhKMkZJV253TXc5UlZWTDJwaE95dE9hSGUzU21LNld6clhqdnBOWmVGb0Uza2xQVnoxWlJxIiwiX192IjowfSwiaWF0IjoxNjQ5Nzg5ODE3fQ.aZ1OxRzmVWPGyRMNWNtxhU_SkgIHw05mimjwLOOdwyc"
}*/
module.exports = verifyToken;
