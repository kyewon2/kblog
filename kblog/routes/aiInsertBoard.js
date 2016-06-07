/**
 * Created by Kyewon on 2016. 6. 7..
 */
var dbPool = require('../routes/dbPool');
var express = require('express');
var router = express.Router();

router.post('/aiInsertBoard', function(req, res, next) {
    var boardData = {title : req.body.title, content : req.body.content};
    console.log('**********************');
    console.log(boardData);
    console.log('**********************');

    dbPool.acquire(function (err, db) {
        if (err) {
            return res.end("CONNECTION error: " + err);
        }
        db.query("INSERT INTO board_ai SET ?", boardData, function (err, result) {
            dbPool.release(db);

            if (err) {
                return res.end("QUERY ERROR: " + err);
            }

            res.send({redirect: '/aiListBoard'});
            //res.redirect('aiListBoard');
            //res.render('aiListBoard');
        });
    });
});

module.exports = router;