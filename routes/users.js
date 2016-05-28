var express = require('express');
var router = express.Router();
var user = require('../model/user');


router.post('/register',function(req, res, next) {
  user.addUser(req.body, function(err, user, status){
    if(err){
         res.status(status).json({'error':true,'data':err.message});
       }
       else{
           res.status(status).json({'error':false,'data':"Registration successfull."});
       }
  });
});
router.post('/authenticate',function(req, res, next) {
  user.authentication(req.body, function(err, data, status){
    if(err){
         res.status(status).json({'error':true,'data':err.message});
       }
       else{
           res.status(status).json({'error':false,'data':data});
       }
  });
});
module.exports = router;
