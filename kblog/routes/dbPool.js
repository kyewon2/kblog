/**
 * Created by Kyewon on 2016. 5. 30..
 */

//load jsonfile
var json_file = require('json-file'),
    jsonData = json_file.read('/Users/Kyewon/kblog/secret.json');

var user = jsonData.get('db_mysql_user');
var password = jsonData.get('db_mysql_pwd');
var database = jsonData.get('db_mysql_database');

var generic_pool = require('generic-pool');
var mysql = require('mysql');
var pool = generic_pool.Pool({
    name : 'mysql',
    create : function(callback) {
        var config = {
            host: 'localhost',
            port: '3306',
            user: user,
            password: password,
            database: database
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