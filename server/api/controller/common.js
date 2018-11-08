'use strict'
var multer = require('multer')
var common = {
    sendJsonResponse: function(res,status,json={},msg={}) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        res.status(status);
        const resultJson = {};
        resultJson.resultData = json;
        resultJson.resultCode = 0;
        resultJson.resultMsg= msg;
        return res.json(resultJson);
    },
    sendResponse: function(res,status,msg) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        res.status(status);
        return res.send(msg);
    },
	sendErrorResponse: function(res,status,json={},msg={}) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
		res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
		res.status(status);
		const resultJson = {};
		resultJson.resultData = json;
		resultJson.resultCode = -1;
		resultJson.resultMsg= msg;
		return res.json(resultJson);
	},
	transferJson(arr) {
		var list = {};
		for (var key in arr) {
			list[key] = arr[key];
		}
		return list;
	}
};
module.exports = common;
