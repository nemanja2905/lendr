var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var apiUser = require('./routes/api/v1/user');
var apiTransaction = require('./routes/api/v1/transaction');
var apiAuthentication = require('./routes/api/v1/authentication');
var apiAdmin = require('./routes/api/v1/admin');
var apiReviews = require('./routes/api/v1/reviews');
var apiDwolla = require('./routes/api/v1/dwolla');

var socketApi = require('./socketApi');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client/build')));


// API Routes
app.use('/api/v1/user', apiUser)
app.use('/api/v1/auth', apiAuthentication)
app.use('/api/v1/transaction', apiTransaction)
app.use('/api/v1/admin', apiAdmin)
app.use('/api/v1/reviews', apiReviews)
app.use('/api/v1/dwolla', apiDwolla)

// catch 404 and forward to error handler

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

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
