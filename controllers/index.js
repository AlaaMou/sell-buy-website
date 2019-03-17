const User = require("../models/user");
const passport = require("passport");


// Define methods

module.exports = {
    // Get index /
    getIndex(req, res, next){
      res.render('index')  
    },
    
    // Get /register
    getRegister(req, res, next){
        res.render('register')
    },
    
    // POST /register
    async postRegister(req, res, next){
        const newUser = new User({
            username: req.body.username,
            email   : req.body.email,  
            image   : req.body.image
        });
    await User.register(newUser, req.body.password);
    res.redirect("/")
    },
    
    // Get /login
    getLogin(req, res, next){
        res.render('login')
    },
    
    // POST /login
    postLogin(req, res, next){
    passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/login' })(req, res, next)
    },
    
    // GET /logout
    getLogout(req, res, next){
         req.logout();
         res.redirect('/');
    },
    
    // Get /profile
    getProfile(req, res, next){
        res.render('profile')
    }
    
}