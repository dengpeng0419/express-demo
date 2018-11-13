'use strict';
var mongoose = require('mongoose');
var common = require('../common');
var User = mongoose.model('User');
var jwt    = require('jsonwebtoken'); // 使用jwt签名
var secret = require('../../config/jwt').jwtsecret; // 引入配置
var express = require('express');
var app = express();
// 设置superSecret 全局参数
app.set('superSecret', secret);

var redis = require('../../common/redis');
var redisClient = redis.getRedisClient();

// 用户授权路径，返回JWT 的 Token 验证用户名密码
module.exports.login = function(req,res) {
	var userName = req.body.name;
	var pwd = req.body.pwd;
	
	User.findOne({
		name: userName
	}, function(err, user) {
		if (err) throw err;
		if (!user) {
			common.sendJsonResponse(res, 200, {notFound: true});
		} else if (user.pwd != pwd) {
			common.sendJsonResponse(res, 200, {secretError: true});
		} else {
			//var token = jwt.sign(user.toJSON(), app.get('superSecret'), {
			var token = jwt.sign({name: user.name}, app.get('superSecret'), {
				expiresIn : 60*10 // 授权时效（秒）
			});
			
			redisClient.hset("roban:demo:hset", user.name, token, function(err,response){
				if(err) {
					console.log('redis数据存储失败', err);
					common.sendErrorResponse(res, 500);
					return;
				}
				console.log('redis token saved.');
			});
			// console.log(global.TOKEN)

			var obj ={
				token: token
			};
			common.sendJsonResponse(res, 200, obj);
		}
	});
}

