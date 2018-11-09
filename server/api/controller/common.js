'use strict'
var multer = require('multer')
var common = {
	sendResponse: function(res,status,resultJson) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
		res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
		res.status(status);
		return res.json(resultJson);
	},
    sendJsonResponse: function(res,status,json={},msg={}) {
        const resultJson = {};
        resultJson.resultData = json;
        resultJson.resultCode = 0;
        resultJson.resultMsg= msg;
	    this.sendResponse(res,status,resultJson);
    },
    
	sendErrorResponse: function(res,status,json={},msg={}) {
		const resultJson = {};
		resultJson.resultData = json;
		resultJson.resultCode = -1;
		resultJson.resultMsg= msg;
		this.sendResponse(res,status,resultJson);
	},
	loginErrorResponse: function(res,status,json={},msg={}) {
		const resultJson = {};
		resultJson.resultData = json;
		resultJson.resultCode = -5;
		resultJson.resultMsg= msg;
		this.sendResponse(res,status,resultJson);
	}
};
module.exports = common;
