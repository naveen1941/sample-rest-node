var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var bcrypt = require('bcrypt');
var jwt    = require('jsonwebtoken'); 
var _ = require('lodash');
var moment = require('moment');
var config = require('../config/config'); 


/**
 * CONSTANTS
 */
var SALT_WORK_FACTOR = 10;

/**
 * USER Schema
 */
var userSchema = mongoose.Schema({
    username : {type:String,required:true, unique:true},
    password : {type:String, maxlength:8},
    is_admin : {type:Boolean},
    created_at : {type : Number},
    updated_at :{type : Number}
});

userSchema.path('username').validate(function(username) {
  return  username.length >= 4;
}, 'username must be >= 4');

userSchema.path('password').validate(function(password) {
  return  password.length >= 8;
}, 'password must be >= 8');

/**
 * Save encoded password
 */
userSchema.pre('save',function (next){
    var user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password,salt,function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});
/**
 * Compare passwords
 */
userSchema.methods.comparePassword = function (password1, callback){
    bcrypt.compare(password1, this.password,function(err, isMatch) {
        if (err) return callback(err, false);
        else if(!isMatch) return callback(err, false);
        else return callback(null, true);
    });
};

userSchema.statics.addUser = function addUser(request, callback){
  var promise = User.findOne({username: request.username}).exec();
  promise.then(function(user) {
    if(user){ throw new Error("User already exists.");}
    else { return null;}
  })
  .then( function(oldUser) {
    if(!oldUser){
       var newUser = new User();
       newUser.username = request.username;
       newUser.password = request.password;
       newUser.is_admin = false;
       newUser.created_at = moment().unix();
       newUser.updated_at = moment().unix();
       return newUser.save();
    }
    else { throw new Error("User creation failed.");}
  })
  .then(function(user) {
      if(!user){throw new Error("User creation failed.");}
      else callback(null, user, 200);
  })
  .catch(function(err){
    return callback(err, null, 400);
  });
};

userSchema.statics.authentication = function(request,callback){
  var promise = User.findOne({username: request.username}).exec();
  promise.then(function(user) {
    if(!user){ throw new Error("No user found.");}
    else { return user;}
  })
  .then( function(user) {
    if(user){
       user.comparePassword(request.password,function(err, isMatch) {
           if (err) {return callback(new Error("No user found."), null, 400);}
           else if(!isMatch) {return callback(new Error("Passwords dont match."), null, 400);}
           else{
               var token = jwt.sign(user,config.secret , {
                    expiresIn: '24h'
               });
               return callback(null, {username:user.username,token:token}, 200);
           }
       });
    }
    else { throw new Error("No user found.");}
  })
  .catch(function(err){
    return callback(err, null, 400);
  });
};

var User = mongoose.model('User',userSchema);
module.exports = User;
