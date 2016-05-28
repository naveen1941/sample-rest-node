var express = require('express');
var router = express.Router();
var Product = require('../model/product');

/* GET home page. */
router.post('/add', function(req, res) {
    Product.addProduct(req, function(err, product, status){
       if(err){
         res.status(status).json({'error':true,'message':err.message});
       }
       else{
           res.status(status).json({'error':false,'message':product});
       }
    });
});

router.get('/get/:id', function(req, res) {
    if(req.params.id.length != 24){
        res.status(400).json({'error':true,'message':'ID is not correct'});
    }
    Product.getProductByID(req, function(err, product, status){
       if(err){
         res.status(status).json({'error':true,'message':err.message});
       }
       else{
           res.status(status).json({'error':false,'message':product});
       }
    });
});

router.put('/edit/:id', function(req, res) {
    if(req.params.id.length != 24){
        res.status(400).json({'error':true,'message':'ID is not correct'});
    }
     Product.editProduct(req, function(err, product,status){
       if(err){
         res.status(status).json({'error':true,'message':err.message});
       }
       else{
           res.status(status).json({'error':false,'message':product});
       }
    });
});

router.delete('/delete/:id', function(req, res,status) {
    if(req.params.id.length != 24){
        res.status(400).json({'error':true,'message':'ID is not correct'});
    }
     Product.deleteProduct(req, function(err, success, status){
       if(err){
         res.status(status).json({'error':true,'message':err.message});
       }
       else{
           res.status(status).json({'error':false,'message':success});
       }
    });
});


router.get('/search', function(req, res,status) {
     Product.searchProducts(req, function(err, success, status){
       if(err){
         res.status(status).json({'error':true,'message':err.message});
       }
       else{
           res.status(status).json({'error':false,'message':success});
       }
    });
});

module.exports = router;
