/**
 * Created by Kyewon on 2016. 5. 28..
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/',function(req,res){
    fs.readFile('views/main.html', 'utf8', function (err, data) {
        res.send(data);
    });
});

module.exports = router;