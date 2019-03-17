var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bdparser=require('body-parser');
var multer=require('multer');
var cookieSession=require('cookie-session');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bdparser());
//上传文件磁盘路径配置
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(req.url.indexOf('product')!==-1){
      cb(null,path.join(__dirname,'public','upload','product'));
    }
    if(req.url.indexOf('user')!==-1){
      cb(null,path.join(__dirname,'public','upload','user'));
    }
    if(req.url.indexOf('banner')!==-1){
      cb(null,path.join(__dirname,'public','upload','banner'));
    }
    
  }
})

var upload = multer({ storage: storage });
app.use(upload.any());
app.use(express.static(path.join(__dirname, 'public/template')));
app.use('/admin',express.static(path.join(__dirname, 'public/admin')));
app.use(express.static(path.join(__dirname, 'public')));

//cookie的配置
app.use(cookieSession({
  name: 'node_id',
  keys: ['key1', 'key2']
}));
///用户端响应
app.use('/api/*',require('./routes/api/params'));
app.use('/api/login',require('./routes/api/login'));
app.use('/api/reg',require('./routes/api/reg'));
app.use('/api/product',require('./routes/api/product'));


///管理端响应
app.use('/admin/login',require('./routes/admin/login'));
app.use('/admin/unlogin',require('./routes/admin/unlogin'));
app.use('/admin/success',require('./routes/admin/feedback/success'));
app.use('/admin/error',require('./routes/admin/feedback/error'));


app.all('/admin/*',require('./routes/admin/islogin'));

app.use('/admin',require('./routes/admin/home'));
app.use('/admin/home',require('./routes/admin/home'));
app.use('/admin/banner',require('./routes/admin/banner'));
app.use('/admin/product',require('./routes/admin/product'));
app.use('/admin/user',require('./routes/admin/user'));
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
  res.render('./feedback/app_error');
});


// app.use('/',require('./routes/index.js'));
// app.use('/users', require('./routes/users.js'));
module.exports = app;





