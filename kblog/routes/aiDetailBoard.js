/**
 * Created by Kyewon on 2016. 6. 5..
 */
var dbPool = require('../routes/dbPool');
var express = require('express');
var router = express.Router();

router.get('/aiDetailBoard/:idx', function(req, res, next) {
    var idx = req.params.idx;
    idx = Number(idx)+1;
    //ailist_index에 해당하는 content를 db에서 불러옴
    dbPool.acquire(function (err, db) {
        if (err) {
            return res.end("CONNECTION error: " + err);
        }
        db.query("SELECT title, content FROM board_ai WHERE id = "+idx, [], function (err, rows, columns) {
            dbPool.release(db);

            if (err) {
                return res.end("QUERY ERROR: " + err);
            }
            console.log('-------------------------------------');
            console.log(rows[0]);
            console.log('-------------------------------------');

            //불러온 내용을 aiDetailBoard로 보냄
            res.render('aiDetailBoard', {rows:rows[0]});
        });
    });
});

module.exports = router;