'use strict';
var mongoose = require('mongoose');
var response = require('../../common/response');
var User = mongoose.model('User');

module.exports.add = function(req,res) {
	var userName = req.body.name;

	User.create({'name':userName, 'pwd': '111111'},function(err,data) {
		if (err) {
			if(err.code === 11000){ //重复插入数据
				response.sendJsonResponse(res, 200, {}, {code: 1, msg: '该用户已存在！'});
			} else {
				response.sendErrorResponse(res, 500, {}, err.errmsg);
			}
			return;
		}
		//console.log('add user success',data);
		response.sendJsonResponse(res, 200, data[0]);
	})
}
