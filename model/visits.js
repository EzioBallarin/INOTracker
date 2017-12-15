var mysql = require('mysql');
var db = require('./db_connection');

var connection = mysql.createConnection(db.config);

exports.getUserVisits = function(email, callback) {
    var query = "CALL user_visits(?)";
    connection.query(query, [email], function (err, result) {
        callback(err, result);
    });
};

var getUserID = function(email, callback) {
    var query = "SELECT user_id FROM p2_users WHERE email=?"
    connection.query(query, [email], function (err, result) {
        callback(err, result);
    });
};

exports.newUserVisit = function(params, callback) {
    getUserID(params[0], function (err, result) {
        if (err)
            callback(err, result);
        else {
            params[0] = result[0].user_id;
            var query = "INSERT INTO p2_user_visit_location (user_id, store_num, visit_date," +
                "visit_reason, visit_meal, visit_note)" +
                " VALUES (?)";
            if (!params[2]) {
                params[2] = new Date();
            }
            connection.query(query, [params], function (err, result){
                callback(err, result);
            });
        }
    });
};

exports.deleteVisit = function (params, callback) {

    getUserID(params.user_id, function (err, result) {
        if (err)
            callback(err, result);
        else {
            var query = "DELETE FROM p2_user_visit_location WHERE user_id = ?" +
                " AND visit_id = ? AND store_num = ?";
            var queryData = [[result[0].user_id], [params.visit_id], [params.store_num]];
            connection.query(query, queryData, function (err, result) {
                callback(err, result);
            });
        }
    })
}