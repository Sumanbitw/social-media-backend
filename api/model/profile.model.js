const mongoose = require('mongoose')

const profileSchema  = mongoose.Schema({
    user : { type : mongoose.Schema.Types.ObjectId, ref : "User" },
    bio : { type : String }

}, { timestamps : true }
)

module.exports = mongoose.model('User', profileSchema)