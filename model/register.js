var mysql = require('mysql');
var db = require('./db_connection');
var connection = mysql.createConnection(db.config);

exports.registerNewUser = function(params, callback){
    var today = new Date();
    var query = "INSERT INTO " +
        "p2_users(first_name, last_name, email, password, created, modified)  " +
        "VALUES (?)";
    var queryData = [[
                    params.inot_fname, params.inot_lname,
                    params.inot_email, params.bcryptedPass,
                    today, today]];
    console.log("Inserting...\n");
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });

};
