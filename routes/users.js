var express = require('express');
var router = express.Router();
var user = require('../model/user');


router.post('/register',function(req, res, next) {
  user.addUser(req.body, function(err, user){
    if(err){
         res.status(400).json({'error':true,'message':err.message});
       }
       else{
           res.status(200).json({'error':false,'message':"Registration successfull."});
       }
  });
});
router.post('/authenticate',function(req, res, next) {
  user.authentication(req.body, function(err, data){
    if(err){
         res.status(400).json({'error':false,'message':err.message});
       }
       else{
           res.status(200).json({'error':true,'message':data});
       }
  });
});
module.exports = router;
