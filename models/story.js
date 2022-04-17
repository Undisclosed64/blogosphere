const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const storySchema = new Schema({
author:{type:Schema.Types.ObjectId,ref:'User',required:true},
title:{type:String,required:true},
text:{type:String,required:true},
dated:{type:Date},
comments:{type:Array,deafult:[]}
})

//virtual for story url
storySchema.virtual('url')
.get(function(){
    return '/story/' + this._id;
})


module.exports = mongoose.model('Story',storySchema);

