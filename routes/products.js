var express = require('express');
var router = express.Router();
var Product = require('../model/product');

/**
 * @api {post} /api/v1/product/add Add Product
 * @apiName AddProduct
 * @apiGroup Product
 *
 * @apiParam {String} name product name atleast 1 length
 * @apiParam {String} description description atleast 50 length
 * @apiParam {Number} price cost non negative
 * @apiParam {Array} category tags
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "error": false,
 *       "data": {
 *          "__v": 0,
 *           "updatedat": 1464449250,
 *          "createdat": 1464449250,
 *           "createdname": "user2",
 *           "createdby": "574923e62d4071502460e9bf",
 *           "isdeleted": false,
 *           "price": 50,
 *           "description": "this is sample product",
 *           "name": "wfvd ",
 *           "_id": "5749b8e2462871941a99e826",
 *           "tags": [
 *           "tag1",
 *           "tag2"
 *           ]
 *        }
 *     }
 *
 * @apiError NoToken token not provided
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *        "data": "No token provided."
 *     }
 * 
 * @apiError WrongToken wrong token
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *        "data": "Failed to authenticate token."
 *     }
 * @apiError ValidationFailure validation failure
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *       "data": "Product validation failed"
 *     }
 * 
 * @apiError BadJSon incorrect json input
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *        "data": "name key is missing or empty"
 *     }
 */
router.post('/add', function(req, res) {
    Product.addProduct(req, function(err, product, status){
       if(err){
         res.status(status).json({'error':true,'data':err.message});
       }
       else{
           res.status(status).json({'error':false,'data':product});
       }
    });
});

/**
 * @api {get} /api/v1/product/get/:id Get Product
 * @apiName GetProduct
 * @apiGroup Product
 *
 * @apiParam {String} id product id, a valid id
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "error": false,
 *       "data": {
 *          "__v": 0,
 *           "updatedat": 1464449250,
 *          "createdat": 1464449250,
 *           "createdname": "user2",
 *           "createdby": "574923e62d4071502460e9bf",
 *           "isdeleted": false,
 *           "price": 50,
 *           "description": "this is sample product",
 *           "name": "wfvd ",
 *           "_id": "5749b8e2462871941a99e826",
 *           "tags": [
 *           "tag1",
 *           "tag2"
 *           ]
 *        }
 *     }
 *
 * @apiError NoToken token not provided
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *        "data": "No token provided."
 *     }
 * 
 * @apiError WrongToken wrong token
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *        "data": "Failed to authenticate token."
 *     }
 * @apiError ValidationFailure wrong id
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *       "data": "ID is not correct"
 *     }
 * 
 * @apiError NoProductFound wrong id
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *       "data": "No product exists."
 *     }
 */
router.get('/get/:id', function(req, res) {
    if(req.params.id.length != 24){
        res.status(400).json({'error':true,'data':'ID is not correct'});
    }
    Product.getProductByID(req, function(err, product, status){
       if(err){
         res.status(status).json({'error':true,'data':err.message});
       }
       else{
           res.status(status).json({'error':false,'data':product});
       }
    });
});

/**
 * @api {put} /api/v1/product/edit/:id Edit Product
 * @apiName EditProduct
 * @apiGroup Product
 *
 * @apiParam {String} id product id, a valid id
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "error": false,
 *       "data": {
 *          "__v": 0,
 *           "updatedat": 1464449250,
 *          "createdat": 1464449250,
 *           "createdname": "user2",
 *           "createdby": "574923e62d4071502460e9bf",
 *           "isdeleted": false,
 *           "price": 50,
 *           "description": "this is sample product",
 *           "name": "wfvd ",
 *           "_id": "5749b8e2462871941a99e826",
 *           "tags": [
 *           "tag1",
 *           "tag2"
 *           ]
 *        }
 *     }
 *
 * @apiError NoToken token not provided
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *        "data": "No token provided."
 *     }
 * 
 * @apiError WrongToken wrong token
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *        "data": "Failed to authenticate token."
 *     }
 * 
 * @apiError NotAuthenticated only owner of product can edit
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *        "data": "Not Authorized."
 *     }
 * 
 * @apiError NoProductFound wrong id
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *       "data": "No product exists."
 *     }
 * 
 * @apiError ValidationFailure wrong id
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *       "data": "ID is not correct"
 *     }
 * 
 * @apiError BadJsonInput bad json
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *       "data": "Nothing is given to edit."
 *     }
 */

router.put('/edit/:id', function(req, res) {
    if(req.params.id.length != 24){
        res.status(400).json({'error':true,'data':'ID is not correct'});
    }
     Product.editProduct(req, function(err, product,status){
       if(err){
         res.status(status).json({'error':true,'data':err.message});
       }
       else{
           res.status(status).json({'error':false,'data':product});
       }
    });
});

/**
 * @api {delete} /api/v1/product/delete/:id Delete Product
 * @apiName DeleteProduct
 * @apiGroup Product
 *
 * @apiParam {String} id product id, a valid id
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "error": false,
 *       "data":"Delete successful"
 *     }
 *
 * @apiError NoToken token not provided
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *        "data": "No token provided."
 *     }
 * 
 * @apiError WrongToken wrong token
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *        "data": "Failed to authenticate token."
 *     }
 * 
 * @apiError NotAuthenticated only owner of product can edit
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *        "data": "Not Authorized."
 *     }
 * 
 * @apiError NoProductFound wrong id
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *       "data": "No product exists."
 *     }
 * 
 */

router.delete('/delete/:id', function(req, res,status) {
    if(req.params.id.length != 24){
        res.status(400).json({'error':true,'data':'ID is not correct'});
    }
     Product.deleteProduct(req, function(err, success, status){
       if(err){
         res.status(status).json({'error':true,'data':err.message});
       }
       else{
           res.status(status).json({'error':false,'data':success});
       }
    });
});

/**
 * @api {get} /api/v1/product/search? Search Products
 * @apiName SearchProducts
 * @apiGroup Product
 *
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "error": false,
 *       "data":[{result 1},{result 2}]
 *     }
 *
 * @apiError NoToken token not provided
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *        "data": "No token provided."
 *     }
 * 
 * @apiError WrongToken wrong token
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *        "data": "Failed to authenticate token."
 *     }
 * 
 * 
 * @apiError BadQuery bad query params
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": true,
 *       "data": "Bad query at tags"
 *     }
 * 
 */

router.get('/search', function(req, res,status) {
     Product.searchProducts(req, function(err, success, status){
       if(err){
         res.status(status).json({'error':true,'data':err.message});
       }
       else{
           res.status(status).json({'error':false,'data':success});
       }
    });
});

module.exports = router;
