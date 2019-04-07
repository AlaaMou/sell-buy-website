const User = require("../models/user");
const Post = require("../models/post");
const passport = require("passport");
const util = require('util');
const crypto = require('crypto');
// SendGrid Email 
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// Define methods

module.exports = {
    // Get index /
    getIndex(req, res, next){
      res.render('index')  
    },
    
    // Get /register
    getRegister(req, res, next){
        res.render('register', {title : 'Travelp Register'})
    },
    
    // POST /register
    async postRegister(req, res, next){
        const newUser = new User({
              username: req.body.username,
              email   : req.body.email
        });
    let user = await User.register(newUser, req.body.password);
    req.login(user, async function(err){
        if(err) return next(err)
        req.flash('success', 'Hi '+ user.username +', welcome To Travelp')
        res.redirect("/posts")
    })
    
    },
    
    // Get /login
    getLogin(req, res, next){
        if(req.isAuthenticated()) return res.redirect('back');
        
        res.render('login', {title : 'Travelp | login'})
        
    },
    
    // POST /login
    async postLogin(req, res, next){
    
    const {username , password} = req.body;
    const {user, error} = await User.authenticate()(username, password);
    if(!user && error) return next(error);
    req.login(user, function(err){
        if(err) return next(err);
        req.flash('success', 'Welcome back, ' + username);
        const redirectUrl = req.session.redirectTo || '/';
        delete req.session.redirectTo;
        res.redirect(redirectUrl)
    })
     
    },
    
    // GET /logout
    getLogout(req, res, next){
         req.logout();
         req.flash('success', 'logged out successfully .. see you soon :)')
         res.redirect('/');
    },
    
    // Get /profile
    async getProfile(req, res, next){
        let posts = await Post.find({
            'author' : req.user._id
            }).populate('author').exec();

        res.render('profile', {title : 'Profile', posts})
    },
    
    // Get Forgot password
    getForgotPw(req, res, next){
        res.render('users/forgot')
    },
    
    // Put Forgot Password
    async putForgotPw(req, res, next){
        
        const token = await crypto.randomBytes(20).toString('hex');
        const url =  req.headers.host;
	
        const user = await User.findOne({ email: req.body.email })
	    if (!user) {
	    req.flash('error', 'No account with that email address exists.')      
	    return res.redirect('/forgot-password');
	    }

	    user.resetPasswordToken = token;
	    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();
  

         const msg = {
         to: user.email,
         from: 'Travelp Admin <alaa.moussa2018@gmail.com>',
         subject: 'Travelp - Forgot Password / Reset',
          text: 
          `You are receiving this because you (or someone else) have requested the reset of the password for your account.
			Please click on the following link, or copy and paste it into your browser to complete the process:
			http://${req.headers.host}/reset/${token}
			If you did not request this, please ignore this email and your password will remain unchanged.`.replace(/				/g, ''),
			templateId: 'd-787bb2699d194e63be4187c2baba58fa',
            dynamic_template_data: {
            token: token,
            url : url
            },
          };

         await sgMail.send(msg);

         req.flash('success', `An e-mail has been sent to ${user.email} with further instructions.`)
         res.redirect('/forgot-password');
    },

     // Get Reset password
    async getReset(req, res, next){
        const { token } = req.params;
	    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })
        if (!user) {
        req.flash('error','Password reset token is invalid or has expired.');
        return res.redirect('/forgot-password');
         }
         res.render('users/reset', { token });
    },
    
    // PUT Reset Password
    async putReset(req, res, next){
        const { token } = req.params;
     	const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
	
	if (!user) {
	 req.flash('error', 'Password reset token is invalid or has expired.') ;
	 return res.redirect(`/reset/${ token }`);
	}

	if(req.body.password === req.body.confirm) {
		await user.setPassword(req.body.password);
		user.resetPasswordToken = undefined;
		user.resetPasswordExpires = undefined;
		await user.save();
     // util.promisifyconverts a regular function into an async function 		
		const login = util.promisify(req.login.bind(req));
		await login(user);
	} else {
		req.flash('error',  'Passwords do not match.');
		return res.redirect(`/reset/${ token }`);
	}

  const msg = {
    to: user.email,
    from: 'Travelp Admin <alaa.moussa2018@gmail.com>',
    subject: 'Surf Shop - Password Changed',
    text: `Hello,
	  	This email is to confirm that the password for your account has just been changed.
	  	If you did not make this change, please hit reply and notify us at once.`.replace(/		  	/g, '')
  };
  
  await sgMail.send(msg);

  req.flash('success', 'Password successfully updated!');
  res.redirect('/');
    }
    
    
}