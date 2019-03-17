const express = require('express');
const router = express.Router();
// Destructure methods from the index controller
const {postRegister, postLogin, getLogout, getLogin, getRegister, getIndex, getProfile} = require("../controllers/index");
const {asyncErrorHandler} = require("../middleware/index");


/* GET home page. */
router.get('/', asyncErrorHandler(getIndex));


/* GET register page /register */
router.get('/register', getRegister);


/* Post register user /register */
router.post('/register', asyncErrorHandler(postRegister));


/* GET login page /register */
router.get('/login', getLogin);

/* Post login page /login */
router.post('/login', postLogin);


/* GET logout user /logout */
router.get('/logout', getLogout);



/* GET profile page /profile/:user_id */
router.get('/profile', getProfile);

/* GET update profile page /profile/:user_id */
router.put('/profile/:user_id', (req, res, next)=> {
  res.send('Update Profile page');
});


/* GET forgot password page /forgot-password */
router.get('/forgot-pw', (req, res, next)=> {
  res.send('forgot password');
});




module.exports = router;
