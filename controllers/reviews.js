const Post   = require("../models/post")
const Review = require("../models/review");


module.exports = {
    // Create new review
    async createReview(req, res, next){
        // find post by its id and populate reviews
        let post = await Post.findById(req.params.id).populate('reviews').exec();
        // use filter method to get an array of reviews by the current user and then get the length of that array (1 or 0)
        let haveReviewed = post.reviews.filter(review=>{
            return review.author.equals(req.user._id)
        }).length
        // Check the value of haveReviewed
        if(haveReviewed){
            req.flash('error', 'Sorry, you can only create one review per post! ')
            return res.redirect('/posts/' + post._id)
        }
        // add author to the review
        req.body.review.author = req.user._id;
        // create the review
        let review = await Review.create(req.body.review);
        // assign review to its post
        post.reviews.push(review);
        // save the post
        post.save();
        // redirect to post show page
        req.flash('success', "Review has been created successfully")
        res.redirect("/posts/" + post._id)
    },
    // Update review
    async updateReview(req, res, next){
        let review = await Review.findByIdAndUpdate(req.params.review_id, req.body.review);
        req.flash('success',' Review updated successfully')
        res.redirect("/posts/" + req.params.id)
    },
    // Delete Review
    async destroyReview(req, res, next){
        // Find the post that contains the review and remove the review id 
        await Post.findByIdAndUpdate(req.params.id,{
            $pull : {reviews : req.params.review_id}    
        });
        // remove review from database
        await Review.findByIdAndRemove(req.params.review_id);
        req.flash('success',' Review deleted successfully')
        res.redirect("/posts/" + req.params.id)
    }
    
}