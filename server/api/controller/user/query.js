'use strict';
var mongoose = require('mongoose');
var response = require('../../common/response');
var User = mongoose.model('User');
var Role = mongoose.model('Role');

module.exports.query = function(req,res) {
	var pageSize = 20;                   //一页多少条
	var currentPage = 1;                //当前第几页
	var sort = {'logindate':-1};        //排序（按登录时间倒序）
	var condition = {};                 //条件
	var skipnum = (currentPage - 1) * pageSize;   //跳过数
	
	var userName = req.body.name;
	var resp = {};
	
	User.findOne({name: 'dengpeng'})
		.populate('role')//注意这是联合查询的关键
		.exec(function(err, data) {
			console.log(data.role.name)
			Role.findOne({name: data.role.name})
				.populate('permission')
				.exec(function(err, data) {
					resp.delete = data.permission.delete;
					console.log(data.permission.delete, '2')
					queryUserMenulist()
				})
		})

	if(userName) {
		condition.name = userName;
	}
	
	function queryUserMenulist() {
		User.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, data) {
			// var userName = req.query.name;
			// User.find({name:{$regex:/dengpeng/i}},null,function(err,data) {
			if (err) {
				response.sendErrorResponse(res, 500, error);
				return;
			} else if(data.length === 0) {
				response.sendJsonResponse(res, 200, {});
			} else {
				resp.list = data;
				response.sendJsonResponse(res, 200, resp);
			}
		})
	}
}
