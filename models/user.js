const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");



const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    joined  : {type : Date , default : Date.now()},
    email    : {type : String, unique: true , required : true},
    image    : {
        url : String,
        public_id : String
    },
    resetPasswordToken : String,
    resetPasswordExpires : Date
});



userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema)

