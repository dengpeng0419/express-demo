var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var loginSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    pwd: {
        type: String,
        require: true
    }
});
 
 
module.exports = mongoose.model('Login',loginSchema,'hello');//hello为对应的表名
