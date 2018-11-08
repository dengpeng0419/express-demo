'use strict';
var mongoose = require('mongoose');
var common = require('../common');
var User = mongoose.model('User');
var jwt    = require('jsonwebtoken'); // 使用jwt签名
var config = require('../../../config'); // 引入配置
var express = require('express');
var app = express();
// 设置superSecret 全局参数
app.set('superSecret', config.jwtsecret);

// 用户授权路径，返回JWT 的 Token 验证用户名密码
module.exports.login = function(req,res) {
	var userName = req.body.name;
	req.body.pwd = '111111';

	User.findOne({
		name: userName
	}, function(err, user) {
		if (err) throw err;
		if (!user) {
			res.json({ success: false, message: '未找到授权用户' });
		} else if (user) {
			if (user.pwd != req.body.pwd) {
				res.json({ success: false, message: '用户密码错误' });
			} else {
				//var token = jwt.sign(user.toJSON(), app.get('superSecret'), {
				var token = jwt.sign({name: user.name}, app.get('superSecret'), {
					expiresIn : 60*10 // 授权时效（秒）
				});
				
				global.TOKEN = token;
				console.log(global.TOKEN)
				
				var obj ={
					success: true,
					message: '请使用您的授权码',
					token: token
				};
				common.sendJsonResponse(res, 200, obj);
			}
		}
	});
}

