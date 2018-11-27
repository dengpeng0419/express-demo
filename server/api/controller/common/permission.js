'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Role = mongoose.model('Role');

// 判断用户的角色和权限
module.exports.permission = function(userName, callback) {
	User.findOne({name: userName})
		.populate('role')//注意这是联合查询的关键
		.exec(function(err, data) {
			if(err) {
				console.log(err, 'permission');
				return;
			}
			Role.findOne({name: data.role.name})
				.populate('permission')
				.exec(function(err, data) {
					callback(data.permission);
				})
		})
}
