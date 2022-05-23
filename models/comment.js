const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({
username:{type:String,required:true},
comment:{type:String,required:true},
timeStamp:{type:Date,required:true},
})

module.exports = mongoose.model('Comment',commentSchema);
