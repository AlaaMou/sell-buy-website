require('dotenv').config()

const createError  = require('http-errors');
const express      = require('express');
const engine       = require('ejs-mate');
const path         = require('path');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const methodOverride = require('method-override');


const logger = require('morgan');

// Mongoose
const mongoose = require("mongoose");
const db       = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database is connected ...")
});

const session              = require("express-session")
const passport             = require("passport");
const localStrategy        = require("passport-local");
const passportLocalMonoose = require("passport-local-mongoose");


// Models
const Post   = require("./models/post");
const User   = require("./models/user")
const Review = require("./models/review");

// Routes
const indexRouter   = require('./routes/index');
const postRouter    = require("./routes/posts");
const reviewRouter  = require("./routes/reviews");


const app = express();

app.use(function(req,res,next){
  req.user = {
    username : "Alaa"
  }
  res.locals.currentUSer = req.user;
  next();
})



// Connect to the database
mongoose.connect('mongodb://localhost/travelp', { useNewUrlParser: true } );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configure passport and sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Mount Routes
app.use('/', indexRouter);
app.use('/posts', postRouter);
app.use('/posts/:id/reviews', reviewRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.currentUSer = req.user;
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
