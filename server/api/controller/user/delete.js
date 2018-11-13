'use strict';
var mongoose = require('mongoose');
var response = require('../../common/response');
var User = mongoose.model('User');
module.exports.delete = function(req,res) {
	var userName = req.body.name;

	User.remove({'name':userName},function(err,data) {
		if (err) {
			response.sendErrorResponse(res, 500, err);
			return;
		} else if(data.n === 0) {
			response.sendErrorResponse(res, 200, {}, {code: -1, msg: '不存在该用户'});
		} else {
			response.sendJsonResponse(res, 200, data[0]);
		}
		console.log('delete user success', data);
	})
}
