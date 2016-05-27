var mongoose = require('mongoose');
var _ = require('lodash');
var moment = require('moment');

var productSchema = mongoose.Schema({
    name : {type:String,required:true},    
    created_at :{type:Number, required:true},
    updated_at :{type:Number, required:true}
});

productSchema.statics.addProduct = function (request, callback){
    var product = new Product();
    product.name = request.name;
    product.created_at = moment().unix();
    product.updated_at = moment().unix();
    product.save();
    callback(null, product);
};

var Product = mongoose.model('Product',productSchema);
module.exports = Product;