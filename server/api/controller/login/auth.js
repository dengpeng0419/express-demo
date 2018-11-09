var express = require('express');
var router = express.Router();
var app = express();
var common = require('../common');
var jwt = require('jsonwebtoken'); // 使用jwt签名
var secret = require('../../config/jwt').jwtsecret; // 引入配置
// 设置superSecret 全局参数
app.set('superSecret', secret);

router.use(function(req, res, next) {
	// 拿取token 数据 按照自己传递方式写
	//var token = req.body.token || req.query.token || req.headers['x-access-token'];
	var token = req.headers['x-access-token'];
	if (token) {
		// 解码 token (验证 secret 和检查有效期（exp）)
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				//无效的token
				common.loginErrorResponse(res, 200, {message: '请重新登录.'});
			} else if(global.TOKEN != token) {
				//token不相同
				common.loginErrorResponse(res, 200, {message: '请重新登录.'});
			}else {
				// 如果验证通过，在req中写入解密结果
				req.decoded = decoded;
				//console.log(decoded);
				next(); //继续下一步路由
			}
		});
	} else {
		// 没有拿到token 返回错误
		common.loginErrorResponse(res, 200, {message: '请先登录.'});
		// return res.status(403).send({
		// 	success: false,
		// 	message: '请先登录.'
		// });
	}
});

module.exports = router;