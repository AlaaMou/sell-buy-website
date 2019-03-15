const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=> {
  res.render('index', { title: 'Travelp' });
});


/* GET register page /register */
router.get('/register', (req, res, next)=> {
  res.send("Registration form");
});


/* Post register user /register */
router.post('/register', (req, res, next)=> {
  res.send("Registration user");
});


/* GET login page /register */
router.get('/login', (req, res, next)=> {
  res.send("Log in form");
});

/* Post login page /login */
router.post('/login', (req, res, next)=> {
  res.send("Logging in user");
});


/* GET logout user /logout */
router.get('/logout', (req, res, next)=> {
  res.send("Logging out user");
});



/* GET profile page /profile/:user_id */
router.get('/profile', (req, res, next)=> {
  res.send('Profile page');
});

/* GET update profile page /profile/:user_id */
router.put('/profile/:user_id', (req, res, next)=> {
  res.send('Update Profile page');
});


/* GET forgot password page /forgot-password */
router.get('/forgot-pw', (req, res, next)=> {
  res.send('forgot password');
});




module.exports = router;
