'use strict';
var mongoose = require('mongoose');
var common = require('../common');
var User = mongoose.model('User');
module.exports.delete = function(req,res) {
	var userName = req.body.name;

	User.remove({'name':userName},function(err,data) {
		if (err) {
			common.sendResponse(res, 500, err);
			return;
		} else if(data.n === 0) {
			common.sendErrorResponse(res, 200, {}, {code: -1, msg: '不存在该用户'});
		} else {
			common.sendJsonResponse(res, 200, data[0]);
		}
		console.log('delete user success', data);
	})
}
