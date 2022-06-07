const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define schema
const storySchema = new Schema({
author:{type:Schema.Types.ObjectId,ref:'User',required:true},
title:{type:String,required:true},
text:{type:String,required:true},
photo:{type:String,required:false},
dated:{type:Date},
comments:[{type:Schema.Types.ObjectId,ref:'Comment'},
]
})



module.exports = mongoose.model('Story',storySchema);

