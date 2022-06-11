var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const authRouter = require('./routes/auth');
const storyRouter = require('./routes/stories');
const commentRouter = require('./routes/comments');
const apicache = require("apicache");



//Set up mongoose connection
const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));


// view engine setup
app.set('views', path.join(__dirname, 'views'));

//configure apicache 
let cache = apicache.middleware
  
//caching all routes for 5 minutes
app.use(cache('5 minutes'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const storage = multer.diskStorage({
  destination:(req,file,cb) =>{
    cb(null,"images")

  },filename:(req,file,cb) => {
    cb(null,req.body.name)
  }
})

const upload = multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res) => {
  res.status(200).json("File has been uploaded")
})


app.use('/api/auth',authRouter);
app.use('/api/stories',storyRouter);
app.use('/api/stories',commentRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('Something went wrong!');
});


module.exports = app;
