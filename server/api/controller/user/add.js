'use strict';
var mongoose = require('mongoose');
var response = require('../../common/response');
var User = mongoose.model('User');
var md5=require('md5-node');
const shortid = require('shortid');

module.exports.add = function(req,res) {
	var userName = req.body.name;
	var pwd = md5(userName+'111111');
	var id = shortid.generate();
	var role = 2;
	console.log(shortid.generate(), 'xxx');
	
	User.create({_id: id, name: userName, pwd: pwd, role: role},function(err,data) {
		if (err) {
			console.log(err)
			if(err.code === 11000){ //重复插入数据
				response.sendJsonResponse(res, 200, {}, {code: 1, msg: '该用户已存在！'});
			} else {
				response.sendErrorResponse(res, 500, {}, err.errmsg);
			}
			return;
		}
		//console.log('add user success',data);
		response.sendJsonResponse(res, 200, data);
	})
}
