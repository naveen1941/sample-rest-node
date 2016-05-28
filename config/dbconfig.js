var mongoose = require('mongoose');
if (process.env.NODE_ENV == 'development'){
        mongoose.connect('mongodb://localhost/wingify');
}
else{
    mongoose.connect('mongodb://naveen:naveen@ds019053.mlab.com:19053/wingify');
}
