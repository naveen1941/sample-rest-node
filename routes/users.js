var express = require('express');
var router = express.Router();
var user = require('../model/user');

/**
 * @api {post} /api/v1/user/register User registration
 * @apiName UserRegistration
 * @apiGroup User
 *
 * @apiParam {String} username Users unique ID, alteast 4 in length
 * @apiParam {String} password alteast 8 in length
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "error": false,
 *       "data": "Registration successfull."
 *     }
 *
 * @apiError UserAlreadyExists already username taken by someone.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *        "data": "User already exists."
 *     }
 * 
 *  @apiError ValidationFailure username or password not alreast required length.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *       "data": "User validation failed"
 *     }
 * @apiError BadJSon incorrect json input
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *        "data": "username key is missing or empty"
 *     }
 */
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

/**
 * @api {post} /api/v1/user/authenticate User authentication
 * @apiName UserAuthentication
 * @apiGroup User
 *
 * @apiParam {String} username Users Name
 * @apiParam {String} password User Password
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "error": false,
 *       "data": {
 *          "username": "user3",
 *          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ"
 *        }
 *     }
 * @apiError BadJSon incorrect json input
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *        "data": "username key is missing or empty"
 *     }
 *
 * @apiError UserNotFound wrong username.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *        "data": "No user found."
 *     }
 * 
 *  @apiError PasswordWrong wrong password entered
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *       "data": "Passwords dont match."
 *     }
 */
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
