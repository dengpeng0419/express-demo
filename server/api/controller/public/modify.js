'use strict';
var mongoose = require('mongoose');
var common = require('../common');
var User = mongoose.model('User');
module.exports.modify = function(req,res) {
	var userName = req.query.name;
	User.update({'name':userName},{'pwd':'123456'},function(err,data) {
		if (err) {
			common.sendResponse(res, 500, err);
			return;
		} else if(data.n === 0) {
			common.sendErrorResponse(res, 200, {}, {code: -1, msg: '不存在该用户'});
		} else {
			common.sendJsonResponse(res, 200, data[0]);
		}
		console.log('modify user success',data);
	})
}
