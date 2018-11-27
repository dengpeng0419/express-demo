'use strict';
var permission = require('../common/permission').permission;
var userDB = require('../dbHandler/user');
var shortid = require('shortid');
var md5 = require('js-md5');
md5('111')

module.exports = {
	init: (req, res) => {
		var loginName = req.body.loginName;
		
		function queryOneUser(perResult) {
			var param = {};
			param.pageSize = 20;                  //一页多少条
			param.currentPage = 1;                //当前第几页
			param.sort = {'logindate':-1};        //排序（按登录时间倒序）
			param.skipnum = (param.currentPage - 1) * param.pageSize;   //跳过数
			param.condition = {};                 //条件
			
			var resp = {};
			
			resp.add = perResult.add;
			resp.delete = perResult.delete;
			
			userDB.query(param, res, resp);
		}
		
		permission(loginName, queryOneUser);     //获取登录用户的增删权限和列表数据
	},
	add: (req, res) => {
		var param = {};
		param.name = req.body.name;
		param.pwd = md5(param.name + '111111');
		param._id = shortid.generate();
		param.role = 2;
		
		userDB.add(param, res);
	},
	query: (req, res) => {
		var loginName = req.body.loginName;
		var userName = req.body.name;
		
		function queryOneUser(perResult) {
			var param = {};
			param.pageSize = 20;                  //一页多少条
			param.currentPage = 1;                //当前第几页
			param.sort = {'logindate':-1};        //排序（按登录时间倒序）
			param.skipnum = (param.currentPage - 1) * param.pageSize;   //跳过数
			param.condition = {};                 //条件
			
			var resp = {};
			if(userName) {
				param.condition.name = userName;
			}
			
			resp.add = perResult.add;
			resp.delete = perResult.delete;
			
			userDB.query(param, res, resp);
		}
		
		permission(loginName, queryOneUser);     //获取登录用户的增删权限和列表数据
	},
	delete: (req, res) => {
		var param = {};
		param.name = req.body.name;
		
		userDB.delete(param, res);
	},
	modify: (req, res) => {
		var param = {};
		param.name = req.body.name;
		param.pwd = '123456';
		
		userDB.modify(param, res);
	}
}