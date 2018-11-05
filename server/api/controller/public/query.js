'use strict';
var mongoose = require('mongoose');
var common = require('../common');
var User = mongoose.model('User');
module.exports.query = function(req,res) {
    var userName = req.query.name;
    User.find({'name':userName},function(err,data) {
        if (err) {
            common.sendErrorResponse(res, 500, error);
            return;
        } else if(data.length === 0) {
	        common.sendJsonResponse(res, 200, {});
        } else {
	        console.log(data);
	        common.sendJsonResponse(res, 200, data);
        }
    })
}
