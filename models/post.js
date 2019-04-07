const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
const Review = require("../models/review")



const postSchema = new mongoose.Schema({
      title       : String,
      created     : {type : Date , default : Date.now()},
      price       : String,
      condition   : String,
      location    : String, 
      coordinates : Array,
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
        ],
    avgRating    : {type : Number,  default : 0}
})


// Pre hook middleware
postSchema.pre('remove', async function(){
    
    await Review.remove({
        _id :{
            $in : this.reviews
        }
    })
})

// adding method to postSchema
postSchema.methods.calculateAvgRating = function(){
    let ratingsTotal = 0 ;
    if(this.reviews.length){
        this.reviews.forEach(function(review){
        ratingsTotal += review.rating;
    })
    this.avgRating = Math.round((ratingsTotal / this.reviews.length)*10) / 10;
    }else{
        this.avgRating = ratingsTotal;
    }
    
    const floorRating = Math.floor(this.avgRating);
    this.save();
    return floorRating;
}



postSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Post', postSchema)