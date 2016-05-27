var express = require('express');
var router = express.Router();
var Product = require('../model/product');

/* GET home page. */
router.post('/add', function(req, res) {
    Product.addProduct(req.body, function(err, product){
       if(err){
         res.status(400).json({'error':true,'message':err.message});
       }
       else{
           res.status(200).json({'error':true,'message':product});
       }
    });
});

module.exports = router;
