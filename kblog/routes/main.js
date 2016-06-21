/**
 * Created by Kyewon on 2016. 5. 28..
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/',function(req,res){
    /*fs.readFile('views/main.html', 'utf8', function (err, data) {
        res.send(data);
    });*/
    //res.send(req.user);
    res.render('main');
});

/*function ensureAuthenticated(req, res, next) {
    // 로그인이 되어 있으면
    if (req.user) {
        console.log("Authenticated");
        res.send(req.user);
        return next();
    }else{
        // 로그인이 안되어 있으면, login 페이지로 진행
        console.log("not Authenticated");
        res.render('main');
    }
}*/

module.exports = router;