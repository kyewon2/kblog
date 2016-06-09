/**
 * Created by Kyewon on 2016. 6. 9..
 */
var dbPool = require('../routes/dbPool');
var express = require('express');
var router = express.Router();

router.post('/aiUpdateBoard', function(req, res, next) {
    var id = req.body.id;
    id = Number(id)+1;
    var boardData = {title : req.body.title, content : req.body.content};
    console.log('**********************');
    console.log(boardData);
    console.log('**********************');

    dbPool.acquire(function (err, db) {
        if (err) {
            return res.end("CONNECTION error: " + err);
        }
        db.query("UPDATE board_ai SET ? WHERE id = "+id, boardData, function (err, result) {
            dbPool.release(db);

            if (err) {
                return res.end("QUERY ERROR: " + err);
            }

            res.send({redirect: '/aiListBoard'});
        });
    });
});

module.exports = router;