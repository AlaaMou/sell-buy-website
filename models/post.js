const mongoose = require("mongoose");



const postSchema = new mongoose.Schema({
      title       : String,
      created     : {type : Date , default : Date.now()},
      price       : String,
      condition   : String,
      location    : String, 
      coordinates : String,
      images      : [
          {
          url : String,
          public_id : String
           }
      ],
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