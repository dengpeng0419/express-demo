'use strict';
var express = require('express');
var router = express.Router();

var queryUser = require('../controller/user/query');
var addUser = require('../controller/user/add');
var deleteUser = require('../controller/user/delete');
var modifyUser = require('../controller/user/modify');

var login = require('../controller/login/login');

router.post('/user/query',queryUser.query);
router.post('/user/add',addUser.add);
router.post('/user/delete',deleteUser.delete);
router.post('/user/modify',modifyUser.modify);

router.post('/login',login.login);

module.exports = router;