var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
require('./api/model/db');
var jwt    = require('jsonwebtoken'); // 使用jwt签名
var config = require('./config'); // 引入配置
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 设置superSecret 全局参数
app.set('superSecret', config.jwtsecret);

// 使用 morgan 将请求日志输出到控制台
app.use(logger('dev'));

//此中中间件的作用是获得请求体字符串，然后转成对象赋值给req.body
app.use(bodyParser.urlencoded({extended:true}));
//判断请求体格式是不是json格式，如果是的话会调用JSON.parse方法把请求体字符串转成对象
app.use(bodyParser.json());
//上面两个只会有一个生效

app.use(cookieParser());

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// Use the session middleware
app.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true,
	cookie: { domain: 'http://localhost:3000', httpOnly: false, secure: false } //secure: true的时候
}))

app.use(cors({
	origin:['http://localhost:8080'],
	methods:['GET', 'POST'],
	allowHeaders:['Content-type', 'Authorization']
}),)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

var user = require('./api/routes/public/user');
var verify = require('./api/routes/common/auth')

app.use('/api/login',user);

app.use('/api/user', verify);

app.use('/api/user',user);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
