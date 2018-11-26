var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var perSchema = new Schema({
	_id: {
		type: Number
	},
	//权限类型：如“MENU”表示菜单的访问权限、“OPERATION”表示功能模块的操作权限、“FILE”表示文件的修改权限、“ELEMENT”表示页面元素的可见性控制
	type: {
		type: String,
		require: true
	},
	delete: {
		type: Boolean
	},
	add: {
		type: Boolean
	}
});

module.exports = mongoose.model('Permission',perSchema,'permission');//第三个参数为对应的集合名
