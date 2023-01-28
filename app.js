const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const authRouter = require("./routes/auth");
const storyRouter = require("./routes/stories");
const commentRouter = require("./routes/comments");
const mongoose = require("mongoose");

//Set up mongoose connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var app = express();
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRouter);
app.use("/api/stories", storyRouter);
app.use("/api/stories", commentRouter);

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "client", "build", "index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
