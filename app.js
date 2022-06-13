const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const multer = require('multer');
const authRouter = require('./routes/auth');
const storyRouter = require('./routes/stories');
const commentRouter = require('./routes/comments');



//Set up mongoose connection
const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

const PORT = 4000 || process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


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


if(process.env.NODE_ENV === 'production'){
app.use(express.static('client/build'));

app.get('*',(req,res)=> {
  res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})


module.exports = app;
