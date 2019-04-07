const express = require('express');
const router = express.Router();
// Destructure methods from the index controller
const {postRegister, postLogin, getLogout, getLogin, getRegister, getIndex, getProfile, getForgotPw, getReset, putForgotPw, putReset} = require("../controllers/index");
const {asyncErrorHandler, checkIfUserExists} = require("../middleware/index");


/* GET home page. */
router.get('/', asyncErrorHandler(getIndex));


/* GET register page /register */
router.get('/register', getRegister);


/* Post register user /register */
router.post('/register',checkIfUserExists, asyncErrorHandler(postRegister));


/* GET login page /register */
router.get('/login', getLogin);

/* Post login page /login */
router.post('/login', asyncErrorHandler(postLogin));


/* GET logout user /logout */
router.get('/logout', getLogout);



/* GET profile page /profile/:user_id */
router.get('/profile', getProfile);

/* GET update profile page /profile/:user_id */
router.put('/profile/:user_id', (req, res, next)=> {
  res.send('Update Profile page');
});


/* GET forgot password page /forgot-password */
router.get('/forgot-password', getForgotPw);

/* Put forgot password page /forgot-password */
router.put('/forgot-password', asyncErrorHandler(putForgotPw));



/* GET reset password page /reset-password */
router.get('/reset/:token', asyncErrorHandler(getReset));

/* Put reset password page /reset-password */
router.put('/reset/:token', asyncErrorHandler(putReset));




module.exports = router;
