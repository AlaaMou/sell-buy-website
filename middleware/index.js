const Review = require("../models/review");
const Post   = require("../models/post");
const User   = require("../models/user");

module.exports = {
    
    asyncErrorHandler : (fn)=>
        (req, res, next)=>{
            Promise.resolve(fn(req, res, next))
            .catch(next)
        },
        
    async isReviewAuthor(req, res, next){
        let review = await Review.findById(req.params.review_id);
        if(review.author.equals(req.user._id)){
            return next();
        }else{
            req.flash('error','You are not authorized to do this action!')
            res.redirect('/posts')
        }
        
    },
    async isPostAuthor(req, res, next){
        let post = await Post.findById(req.params.id) ;
        if(post.author.equals(req.user._id)){
        
            return next();
        }else{
            req.flash('error','You are not authorized to do this action!')
            res.redirect('/posts')
        }
    },
 
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }else{
            req.flash('error', 'You need to log in first to do this action');
            req.session.redirectTo = req.originalUrl,
            res.redirect('/login')
        }
    },
    async checkIfUserExists(req, res, next){
        let userExists = await User.findOne({'email' : req.body.email});
        
        if(userExists){
            req.flash('error', 'A user with the same Email is already registered');
            
            return res.redirect('/register')
        }else{
            return next();
        }
        
    }
    
    
}