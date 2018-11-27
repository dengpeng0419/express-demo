'use strict';
var express = require('express');
var router = express.Router();

var login = require('../controller/login/login').login;
var logout = require('../controller/login/logout').logout;
var userListHandler = require('../controller/userList/userListHandler');

router.post('/login', login);
router.post('/logout', logout);

router.post('/userlist/init', userListHandler.init);
router.post('/userlist/query', userListHandler.query);
router.post('/userlist/addUser', userListHandler.add);
router.post('/userlist/deleteUser', userListHandler.delete);
router.post('/userlist/modifyUser', userListHandler.modify);

module.exports = router;