var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	_id: {
		type: String
	},
	name: {
		type: String,
		require: true,
		unique: true
	},
	pwd: {
		type: String,
		require: true
	},
	role: {
		type: Number,
		ref: 'Role'
	},
	createTime: {
		type: Date,
		default: Date.now
	},
	updateTime: {
		type: Date,
		default: Date.now
	}
}, {
	versionKey: false,
	timestamps: {
		createdAt: 'createTime',
		updatedAt: 'updateTime'
	}
});

// 连表查询方法
userSchema.statics = {
	// findRoleByUser:function(userId, callback) {
	// 	console.log(userId, callback)
	// 	return this.findOne({id: userId})
	// 		.populate({
	// 			path: 'Role'
	// 		})
	// 		.exec(callback)
	// 	// return this
	// 	// 	.findOne({id: userId}).populate('id')  // 关联查询
	// 	// 	.exec(callback)
	// }
}

module.exports = mongoose.model('User', userSchema, 'user');//第三个参数为对应的集合名
