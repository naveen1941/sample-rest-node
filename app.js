/**
 * TODO
 * Mocha test cases
 * Indexes on db's
 * Documentation
 * Validations for all requests..
 * 
 */

require('./config/dbconfig.js');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var _=require('lodash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var jwt    = require('jsonwebtoken'); 
var config = require('./config/config'); 

var products = require('./routes/products');
var users = require('./routes/users');
var requestBodyValidation = require('./helpers/validation');

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
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    var errorList = requestBodyValidation(req);
    if(!errorList) next();
    else res.status(400).send({'error':true,'message': errorList});
});

app.use('/api/v1/user', users);
app.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token,config.secret , function(err, decoded) {      
      if (err) {
        return res.status(401).send({ error: true, message: 'Failed to authenticate token.' });    
      } else {
        req.user = decoded._doc; 
        next();
      }
    });
  } 
  else { return res.status(401).send({ error: true, message: 'No token provided.' });}
});

app.use('/api/v1/product', products);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
