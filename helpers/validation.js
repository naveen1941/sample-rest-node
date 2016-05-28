var _ = require('lodash');

//All validation keys based on URL end-point
var allKeys={
    //USER Validations
    '/api/v1/user/register':["username","password"],
    '/api/v1/user/authenticate':["username","password"],
    
    //PRODICT
    '/api/v1/product/add':["name","description","price","tags"],
}


module.exports = function validateRequestBodyGetErrorList(request){
    var rKeys=allKeys[request.url];
    if(rKeys){
        var eKeys=[];
        _.forEach(rKeys, function(key){
            if(key in request.body && request.body[key]){ return;}
            else eKeys.push(key);
        });
        if(eKeys.length == 0) return null;
        else if(eKeys.length == 1) return eKeys[0] + ' key is missing or empty';
        else {
            var keys='';
            _.forEach(eKeys, function(mkey){
                keys = keys + mkey+', ';
            });
            return keys +' keys are missing or empty.';
        }
    }
    else return null;
}
