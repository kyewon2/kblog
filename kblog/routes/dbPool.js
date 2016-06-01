/**
 * Created by Kyewon on 2016. 5. 30..
 */
var generic_pool = require('generic-pool');
var mysql = require('mysql');
var pool = generic_pool.Pool({
    name : 'mysql',
    create : function(callback) {
        //localhost가 아닐시 암호화
        var config = {
            host: 'localhost',
            port: '3306',
            user: 'dev',
            password: '1234',
            database: 'kblog'
        }
        var conn = mysql.createConnection(config);
        conn.connect(function(err) {
            if(err)
                console.log(err);
            else
            callback(err, conn);
        });
    },
    destroy: function(conn) {
        conn.end();
    },
    min: 1,
    max: 10,
    idleTimeoutMillis : 300000,
    log : false
});

process.on("exit", function() {
    pool.drain(function () {
        pool.destroyAllNow();
    });
});


module.exports = pool;