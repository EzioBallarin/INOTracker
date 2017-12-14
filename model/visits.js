var mysql = require('mysql');
var db = require('./db_connection');

var connection = mysql.createConnection(db.config);

exports.getUserVisits = function(email, callback) {
    var query = "CALL user_visits(?)";
    connection.query(query, [email], function (err, result) {
        callback(err, result);
    });
};