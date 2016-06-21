/**
 * Created by Kyewon on 2016. 6. 17..
 */
var express = require('express');
var router = express.Router();
var passport = require('passport')
    , FacebookStrategy = require('passport-facebook');


//페이스북 로그인 설정
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/facebookLogin' }),
    function(req, res) {
        // Successful authentication, redirect home.
        /*if (req.isAuthenticated()) {
            console.log("Authenticated");
            res.send(req.user);
        }*/
        res.redirect('/');
    });


//로그아웃 차후 처리
router.get('/logout', function(req, res){
    console.log("call logout");
    req.logout();
    res.redirect('/');
});

module.exports = router;