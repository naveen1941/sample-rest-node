var mongoose = require('mongoose');
var _ = require('lodash');
var moment = require('moment');

/**
 * PRODUCT SCHEMA HERE
 */
var productSchema = mongoose.Schema({
    name : {type:String,required:true, trim: true},    
    description :{type:String, required:true, trim: true},
    price :{type:Number,required:true},
    tags :[],
    createdby:{type:  mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdname:{type:String, required:true},
    isdeleted :{type:Boolean},
    createdat :{type:Number, required:true},
    updatedat :{type:Number, required:true}
});

productSchema.path('name').validate(function(name) {
  return  name.length >= 1;
}, 'name must be >= 1');

productSchema.path('description').validate(function(description) {
  return  description.length >= 10;
}, 'description must be >= 10');

productSchema.path('price').validate(function(price) {
  return  price >= 0;
}, 'price must be >= 0');

productSchema.path('tags').validate(function(tags) {
  return  tags.length >= 1;
}, 'tags must be >= 1');


productSchema.index({name:'text'});
productSchema.index({price:1,createdname:1,updatedat:1});

var editableKeys = ["name","description","price","tags"];

productSchema.statics.addProduct = function (request, callback){
    var product = new Product();
    product.name = request.body.name;
    product.description = request.body.description;
    product.price = request.body.price;
    product.tags = request.body.tags;
    product.isdeleted = false;
    product.createdby = request.user._id;
    product.createdname = request.user.username;
    product.createdat = moment().unix();
    product.updatedat = moment().unix();
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
        if(product.createdby == request.user._id){
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
    else if(product.isdeleted) { throw new Error("No product exists.");}
    else {  return callback(null, product, 200);}
  })
  .catch(function(err){
    return callback(err, null, 400);
  });
};

productSchema.statics.deleteProduct = function (request, callback){
  var promise = Product.findOne({_id: request.params.id}).exec();
  promise.then(function(product) {
    if(!product || product.isdeleted){ throw new Error("No product exists.");}
    else { 
        if(product.createdby == request.user._id){
          product.isdeleted = true;
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

var validSearchQueryParams = ['name','price','price_gt','price_gte','price_lt','price_lte',
                              'tags_all','tags_in','createdby','createdname','createdat',
                              'createdat_gt','createdat_gte','createdat_lt','createdat_lte',
                              'updatedat','updatedat_gt','updatedat_gte','updatedat_lt',
                              'updatedat_lte'];
productSchema.statics.searchProducts = function(request, callback){
  var parsedQuery ={};
  var parseStatus = true;
  var errorDesc ='';
  parsedQuery.isdeleted = false;
  _.forEach(request.query, function(value, key){
    if(validSearchQueryParams.indexOf(key)==-1) {parseStatus = false;errorDesc=key; return false;}
    if(value.indexOf('[')>-1){
      try{value = JSON.parse(value);}
      catch(e){
        parseStatus = false;errorDesc=key; return false;
      }
    } 
    if(key.indexOf('_')>0){
      var keys = key.split("_");
      var innervalue = '$'+keys[1];
      if(parsedQuery[keys[0]]){
        parsedQuery[keys[0]]['$'+keys[1]] =value;
      }else{
        parsedQuery[keys[0]]={};
        parsedQuery[keys[0]]['$'+keys[1]] =value;
      } 
    }
    else{
      if(key ==='name'){parsedQuery['$text'] =  {'$search' : value}}
      else parsedQuery[key] = value;
    }
  });
  if(parseStatus){
    var promise = Product.find(parsedQuery).sort({name:-1}).exec();
    promise.then(function(products) {
      if(!products){ callback(null, "No Products", 200);}
      else {  return callback(null, products, 200);}
    })
    .catch(function(err){
      return callback(err, null, 400);
    });
  }
  else{
    return callback(new Error('Bad query at '+errorDesc), null, 400);
  }
  
};

var Product = mongoose.model('Product',productSchema);
var User = require('./user');
module.exports = Product;