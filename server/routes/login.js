var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	console.log('hi');
	res.json({
		name: 'dengpeng',
		pwd: '123456'
	})
});

module.exports = router;