const mongoose = require('mongoose')

const userSchema  = mongoose.Schema({
    name : { type :String, required : true },
    email : { type : String, required : true },
    password : { type : String, required : true },
    profileImage : { type : String, default : "" },
    bio : { type : String, default : "" },
    coverImage : { type : String, default : ""},
    followers : { type : Array, default : [] },
    followings : { type : Array, default : [] },    
    isAdmin : { type : Boolean, default : false },
    description : { type : String, default : "" },
    city : { type : String, default : "" }
}, { timestamps : true }
)

module.exports = mongoose.model('User', userSchema)