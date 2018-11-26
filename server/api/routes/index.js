'use strict';
var express = require('express');
var router = express.Router();

var queryUser = require('../controller/user/query').query;
var addUser = require('../controller/user/add').add;
var deleteUser = require('../controller/user/delete').delete;
var modifyUser = require('../controller/user/modify').modify;

var login = require('../controller/login/login').login;
var logout = require('../controller/login/logout').logout;

var userListInit = require('../controller/userList/init').init;
var userListQuery = require('../controller/userList/query').query;

router.post('/user/query', queryUser);
router.post('/user/add', addUser);
router.post('/user/delete', deleteUser);
router.post('/user/modify', modifyUser);

router.post('/login', login);
router.post('/logout', logout);

router.post('/userlist/init', userListInit);
router.post('/userlist/query', userListQuery);

module.exports = router;