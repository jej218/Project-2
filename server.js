var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
// session middleware
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');


// load the env vars
require('dotenv').config();

// create the Express appj
var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cocktailRouter = require('./routes/cocktails');
var reviewsRouter = require('./routes/reviews');
var ingredientRouter = require('./routes/ingredients');


// connect to the MongoDB with mongoose
require('./config/database');
// configure Passport
require('./config/passport');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// mount the session middleware
app.use(session({
    secret: 'SEI Rocks!',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


// Add this middleware BELOW passport middleware
app.use(function(req, res, next) {
    res.locals.user = req.user; // assinging a property to res.locals, makes that said property (user) availiable in every
    // single ejs view
    next();
});

// mount all routes with appropriate base paths
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/cocktails', cocktailRouter);
app.use('/', reviewsRouter);
app.use('/ingredients', ingredientRouter);


app.use(function(req, res) {
    res.status(404).send('Cant find that!');
});


module.exports = app;