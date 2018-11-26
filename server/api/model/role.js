var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema({
	_id: {
		type: Number
	},
	name: {
		type: String,
		require: true,
		unique: true
	},
	permission: {
		type: Number,
		ref: 'Permission'
	}
});

module.exports = mongoose.model('Role',roleSchema,'role');//第三个参数为对应的集合名
