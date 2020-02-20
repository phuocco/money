var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser   = require('body-parser');
var session = require('express-session');
const config = require('config');
var mongoose = require('mongoose')
var MongoStore   = require('connect-mongo')(session);

 var mongodb = 'moneylover-llyyf.gcp.mongodb.net/money';
 var mongodb2 ='mongodb+srv://phuoc:master123@moneylover-llyyf.gcp.mongodb.net/money?retryWrites=true&w=majority';
 var local = 'mongodb://localhost/money';
mongoose.connect(mongodb2, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

// if (!config.get('PrivateKey')) {
//   console.error("error");
//   process.exit(1); 
// }
 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter =  require('./routes/category');
var transactionRouter =  require('./routes/transaction');
var eventRouter =  require('./routes/event');
var picassoRouter =  require('./routes/picasso');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//use sessions for tracking logins
app.use(session({
  secret: 'moneylover',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {maxAge: 180 * 60 * 1000}
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/transaction',transactionRouter);
app.use('/event',eventRouter);
app.use('/picasso',picassoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
