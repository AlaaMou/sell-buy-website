const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({
    body   : String,
    created : {type : Date , default : Date.now()},
    rating : Number,
    author : {
            type : mongoose.Schema.Types.ObjectId,
            ref  : 'User'
    }
})


module.exports = mongoose.model('Review', reviewSchema)