var mysql = require('mysql');
var db = require('./db_connection');

var connection = mysql.createConnection(db.config);

exports.getLocationImages = function (callback) {
    var query = "SELECT * FROM p1_location_image";
    connection.query(query, null, function (err, result) {

        callback(err, result);
    });
};