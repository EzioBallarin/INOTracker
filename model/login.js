var mysql = require('mysql');
var db = require('./db_connection');

var connection = mysql.createConnection(db.config);

exports.loginUser = function(email, callback) {
    var query = "SELECT password, first_name, last_name, email FROM p2_users WHERE email=?";
    connection.query(query, [email], function (err, result) {
        callback(err, result);
    });
};