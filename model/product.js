var mongoose = require('mongoose');
var _ = require('lodash');
var moment = require('moment');

/**
 * PRODUCT SCHEMA HERE
 */
var productSchema = mongoose.Schema({
    name : {type:String,required:true},    
    description :{type:String, required:true},
    price :{type:Number,required:true},
    tags :[],
    owner:{type:  mongoose.Schema.Types.ObjectId, ref: 'User'},
    created_at :{type:Number, required:true},
    updated_at :{type:Number, required:true}
});

productSchema.statics.addProduct = function (req, callback){
    var product = new Product();
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.tags = req.body.tags;
    console.log(req.user._id);
    product.owner = req.user._id;
    product.created_at = moment().unix();
    product.updated_at = moment().unix();
    product.save(function(err, product){
        if(err) callback(err, null);
        else callback(null, product);
    });
};

productSchema.statics.editProduct = function (request, callback){
  var promise = Product.findOne({_id: request.body.id}).exec();
  promise.then(function(product) {
    if(!product){ throw new Error("No product exists.");}
    else { 
        if(product.owner == request.user._id){
            product['name']="LOL FUCK NAME";
            return product.save();
        }
        else{ throw new Error("Not Authorized.");}
    }
  })
  .then( function(product) {
    if(product){
      callback(null,product);
    }
    else { throw new Error("Product updation failed.");}
  })
  .catch(function(err){
    return callback(err, null);
  });
};

var Product = mongoose.model('Product',productSchema);
var User = require('./user');
module.exports = Product;