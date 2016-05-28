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
    is_deleted :{type:Boolean},
    created_at :{type:Number, required:true},
    updated_at :{type:Number, required:true}
});

var editableKeys = ["name","description","price","tags"];

productSchema.statics.addProduct = function (request, callback){
    var product = new Product();
    product.name = request.body.name;
    product.description = request.body.description;
    product.price = request.body.price;
    product.tags = request.body.tags;
    product.is_deleted = false;
    product.owner = request.user._id;
    product.created_at = moment().unix();
    product.updated_at = moment().unix();
    product.save(function(err, product){
        if(err) callback(err, null, 400);
        else callback(null, product, 200);
    });
};

productSchema.statics.editProduct = function (request, callback){
  var promise = Product.findOne({_id: request.params.id}).exec();
  promise.then(function(product) {
    if(!product){ throw new Error("No product exists.");}
    else { 
        if(product.owner == request.user._id){
          if(request.body.edit &&  Object.keys(request.body.edit).length>0){
             _.forEach(request.body.edit, function(value, key){
                if(editableKeys.indexOf(key) > -1){
                   product[key] = value;
                }
            });
            return product.save();
          }
          else{
            throw new Error("Nothing is given to edit.");
          }
        }
        else{ throw new Error("Not Authorized.");}
    }
  })
  .then( function(product) {
    if(product){
      callback(null,product, 200);
    }
    else { throw new Error("Product updation failed.");}
  })
  .catch(function(err){
    return callback(err, null, 400);
  });
};

productSchema.statics.getProductByID = function (request, callback){
  var promise = Product.findOne({_id: request.params.id}).exec();
  promise.then(function(product) {
    if(!product){ throw new Error("No product exists.");}
    else if(product.is_deleted) { throw new Error("No product exists.");}
    else {  return callback(null, product, 200);}
  })
  .catch(function(err){
    return callback(err, null, 400);
  });
};

productSchema.statics.deleteProduct = function (request, callback){
  var promise = Product.findOne({_id: request.params.id}).exec();
  promise.then(function(product) {
    if(!product || product.is_deleted){ throw new Error("No product exists.");}
    else { 
        if(product.owner == request.user._id){
          product.is_deleted = true;
          return product.save();
        }
        else{ throw new Error("Not Authorized.");}
    }
  })
  .then( function(product) {
    if(product){
      callback(null,"Delete successful", 200);
    }
    else { throw new Error("Product deletion failed.");}
  })
  .catch(function(err){
    return callback(err, null, 400);
  });
};

productSchema.statics.searchProducts = function(request, callback){
  console.log(request.query);
  callback(null,true,200);
};

var Product = mongoose.model('Product',productSchema);
var User = require('./user');
module.exports = Product;