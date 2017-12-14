var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');

/* Project 2 additions */
var about = require('./routes/about');
var register = require('./routes/register_routes');
var login = require('./routes/login_routes');
var logout = require('./routes/logout_routes');
var locations = require('./routes/location_routes');
var visits = require('./routes/visit_routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Project 2 Addition*/
// initialize sessionto track logged-in users
app.use(session({
    key: 'user_sid',
    secret: 'cs355ssu',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
}));

app.use( (req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

sessionChecker = function (req, res, msg, next) {
    if (req.session.user && req.cookies.user_sid) {
        res.render('index', {message: msg});
    } else {
        next();
    }
};

setSessionLocal = function(req, res) {
    res.locals.user = req.session.user;
};

endSession = function(req, res) {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        req.session.user = undefined;
    }
    setSessionLocal(req, res);
    res.render('index', {logoutSuccess: true});
};

app.use('/', index);
app.use('/users', users);

/* Project 2 Additions */
// Associate appropriate router with given URL
app.use('/about', about);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/locations', locations);
app.use('/visits', visits);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
