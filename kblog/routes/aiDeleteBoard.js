/**
 * Created by Kyewon on 2016. 6. 8..
 */
var dbPool = require('../routes/dbPool');
var express = require('express');
var router = express.Router();

router.get('/aiDeleteBoard/:idx', function(req, res, next) {
    var idx = req.params.idx;
    idx = Number(idx)+1;
    dbPool.acquire(function (err, db) {
        if (err) {
            return res.end("CONNECTION error: " + err);
        }
        //삭제 하고
        //ALTER TABLE test_table AUTO_INCREMENT=1
        db.query("DELETE FROM board_ai WHERE id = ?", idx, function (err, result) {
            dbPool.release(db);

            if (err) {
                return res.end("QUERY ERROR: " + err);
            }
            /*if(result){
                db.query("ALTER TABLE board_ai AUTO_INCREMENT=1", function(){
                    res.send({redirect: '/aiListBoard'});
                });
            }*/
            res.send({redirect: '/aiListBoard'});
        });
    });
});

module.exports = router;