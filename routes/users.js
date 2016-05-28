var express = require('express');
var router = express.Router();
var user = require('../model/user');


router.post('/register',function(req, res, next) {
  user.addUser(req.body, function(err, user, status){
    if(err){
         res.status(status).json({'error':true,'message':err.message});
       }
       else{
           res.status(status).json({'error':false,'message':"Registration successfull."});
       }
  });
});
router.post('/authenticate',function(req, res, next) {
  user.authentication(req.body, function(err, data, status){
    if(err){
         res.status(status).json({'error':true,'message':err.message});
       }
       else{
           res.status(status).json({'error':false,'message':data});
       }
  });
});
module.exports = router;
