const mongoose = require('mongoose')

const postSchema  = mongoose.Schema({
    user : { type : mongoose.Schema.Types.ObjectId, ref : "User" },
    image : { type : String },
    text : { type : String },
    likes : { type : Array, default : []}

}, { timestamps : true }
)

module.exports = mongoose.model('Post', postSchema)