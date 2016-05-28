var express = require('express');
var router = express.Router();
var Product = require('../model/product');

/* GET home page. */
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
