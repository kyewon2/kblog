var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport')
    , FacebookStrategy = require('passport-facebook');
var json_file = require('json-file'),
    jsonData = json_file.read('/Users/Kyewon/kblog/secret.json');

var routes = require('./routes/main');
var facebookLogin = require('./routes/facebookLogin');
var aiListBoard = require('./routes/aiListBoard');
var aiDetailBoard = require('./routes/aiDetailBoard');
var aiInsertBoard = require('./routes/aiInsertBoard');
var aiDeleteBoard = require('./routes/aiDeleteBoard');
var aiUpdateBoard = require('./routes/aiUpdateBoard');
var app = express();

// view engine setup
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize()); //pasport의 serialize하려면 필요함
app.use(passport.session());    //pasport의 serialize하려면 필요함
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, 'views')));

//use routes
app.use('/', routes);
app.use('/', aiListBoard);
app.use('/', aiDetailBoard);
app.use('/', aiInsertBoard);
app.use('/', aiDeleteBoard);
app.use('/', aiUpdateBoard);
app.use('/', facebookLogin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 인증후 사용자 정보를 세션에 저장
passport.serializeUser(function(user, done) {
    console.log('serialize');
    console.log("*********************");
    console.log(user);
    console.log("*********************");
    done(null, user);
});

// 인증 후, 페이지 접근시 마다 사용자 정보를 Session에서 읽어옴.
passport.deserializeUser(function(user, done) {
    console.log('deserialize');
    done(null, user);
});

//페이스북 토큰 설정
/*
* 일단, 토큰을 받아옴
* 차후, 토큰을 활용할 때 저장 기능부터 하면됨
* */
var clientID = jsonData.get('passport_facebook_id');
var clientSecret = jsonData.get('passport_facebook_secret');

passport.use(new FacebookStrategy({
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: "http://localhost:57676/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile.id);
        console.log(profile.displayName);
        var user = { 'userid':profile.id,
                    'username':profile.displayName};
        done(null,user);
        //디비에 accessToken정보 저장

        /*User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return done(err, user);
        });*/
    }
));


// error handlers

// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}*/

// production error handler
// no stacktraces leaked to user
/*app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});*/


module.exports = app;
