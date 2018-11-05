var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var userSchema = new Schema({
    name: {
        type: String,
        require: true,
	    unique: true
    },
    pwd: {
        type: String,
        require: true
    }
});
 
module.exports = mongoose.model('User',userSchema,'hello');//hello为对应的集合名
