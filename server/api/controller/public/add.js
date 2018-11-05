'use strict';
var mongoose = require('mongoose');
var common = require('../common');
var User = mongoose.model('User');
module.exports.add = function(req,res) {
	var userName = req.query.name;
	User.create({'name':userName, 'pwd': '111111'},function(err,data) {
		if (err) {
			if(err.code === 11000){ //重复插入数据
				common.sendErrorResponse(res, 200, {}, err.errmsg);
			} else {
				common.sendResponse(res, 500, err);
			}
			return;
		}
		console.log('add user success',data);
		common.sendJsonResponse(res, 200, data[0]);
	})
}
