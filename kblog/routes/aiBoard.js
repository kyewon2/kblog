/**
 * Created by Kyewon on 2016. 5. 30..
 */
var dbPool = require('../routes/dbPool');
var express = require('express');
var router = express.Router();

router.get('/aiboard', function (req, res) {
    dbPool.acquire(function (err, db) {
        if (err) {
            return res.end("CONNECTION error: " + err);
        }
        db.query("select * from board_ai", [], function (err, rows, columns) {
            dbPool.release(db);

            if (err) {
                return res.end("QUERY ERROR: " + err);
            }
            console.log('-------------------------------------');
            console.log(rows);
            console.log('-------------------------------------');

            //res.end(JSON.stringify(rows));
            res.render('aiListBoard', {rows:rows});
        });
    });
});

module.exports = router;