'use strict';
var mongoose = require('mongoose');
var response = require('../../common/response');
var User = mongoose.model('User');

module.exports.query = function(req,res) {
	var pageSize = 20;                   //一页多少条
	var currentPage = 1;                //当前第几页
	var sort = {'logindate':-1};        //排序（按登录时间倒序）
	var condition = {};                 //条件
	var skipnum = (currentPage - 1) * pageSize;   //跳过数
	
	var userName;
	userName = req.body.name;

	if(userName) {
		condition.name = userName;
	}

	User.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, data) {
    // var userName = req.query.name;
    // User.find({name:{$regex:/dengpeng/i}},null,function(err,data) {
        if (err) {
            response.sendErrorResponse(res, 500, error);
            return;
        } else if(data.length === 0) {
	        response.sendJsonResponse(res, 200, {});
        } else {
        	var obj = {};
        	obj.list = data;
	        response.sendJsonResponse(res, 200, obj);
        }
    })
}
