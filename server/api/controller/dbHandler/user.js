'use strict';
var mongoose = require('mongoose');
var response = require('../../common/response');
var User = mongoose.model('User');

module.exports = {
	add: (param, res) => {
		User.create(param, function(err, data) {
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
	},
	query: (param, res, respJson) => {
		const {condition = {}, skipnum, pageSize, sort} = param;
		User.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, data) {
			// var userName = req.query.name;
			// User.find({name:{$regex:/dengpeng/i}},null,function(err,data) {
			if (err) {
				response.sendErrorResponse(res, 500, error);
				return;
			} else if(data.length === 0) {
				response.sendJsonResponse(res, 200, {});
			} else {
				respJson.list = data;
				response.sendJsonResponse(res, 200, respJson);
			}
		})
	},
	delete: (param, res) => {
		User.remove(param, function(err,data) {
			if (err) {
				response.sendErrorResponse(res, 500, err);
				return;
			} else if(data.n === 0) {
				response.sendErrorResponse(res, 200, {}, {code: -1, msg: '不存在该用户'});
			} else {
				response.sendJsonResponse(res, 200, data);
			}
			console.log('delete user success', data);
		})
	},
	modify: (param, res) => {
		User.update(param, function(err,data) {
			if (err) {
				response.sendErrorResponse(res, 500, err);
				return;
			} else if(data.n === 0) {
				response.sendErrorResponse(res, 200, {}, {code: -1, msg: '不存在该用户'});
			} else {
				response.sendJsonResponse(res, 200, data);
			}
			console.log('modify user success',data);
		})
	}
}
