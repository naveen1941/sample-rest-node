var express = require('express');
var router = express.Router();
var Product = require('../model/product');

/* GET home page. */
router.post('/add', function(req, res) {
    Product.addProduct(req, function(err, product){
       if(err){
         res.status(400).json({'error':true,'message':err.message});
       }
       else{
           res.status(200).json({'error':true,'message':product});
       }
    });
});

router.get('/get/:id', function(req, res) {
    Product.getProduct(req, function(err, product){
       if(err){
         res.status(400).json({'error':true,'message':err.message});
       }
       else{
           res.status(200).json({'error':true,'message':product});
       }
    });
});

router.put('/edit', function(req, res) {
     Product.editProduct(req, function(err, product){
       if(err){
         res.status(400).json({'error':true,'message':err.message});
       }
       else{
           res.status(200).json({'error':true,'message':product});
       }
    });
});

router.delete('/delete/:id', function(req, res) {
    
});

module.exports = router;
