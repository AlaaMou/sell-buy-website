const mongoose = require("mongoose");



const postSchema = new mongoose.Schema({
    title       : String,
    price       : String,
    location    : String,
    coordinates : String,
    images      : [String],
    description : String,
    author      : {
            type : mongoose.Schema.Types.ObjectId,
            ref  : 'User'
            },
    reviews     : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  : 'Review'
        }
        ]
})

module.exports = mongoose.model('Post', postSchema)