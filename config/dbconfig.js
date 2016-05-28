var mongoose = require('mongoose');
if (process.env.NODE_ENV == 'development'){
        mongoose.connect('mongodb://127.0.0.1:27017/wingify');
}
else{
    mongoose.connect('mongodb://naveen:naveen@ds019053.mlab.com:19053/wingify');
}
