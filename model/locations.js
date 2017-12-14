var mysql = require('mysql');
var db = require('./db_connection');

var connection = mysql.createConnection(db.config);

exports.getLocationStates =  function (callback) {
    var query = "CALL store_states()";
    connection.query(query, null, function (err, result) {
        callback(err, result);
    });
};

exports.getLocationsInStates = function(params, callback) {

    var query = "SELECT a.* FROM p1_address a WHERE state IN (?) GROUP BY a.city"
    var queryData = [];

    if (params.constructor === Array) {
        for (var i = 0; i < params.length; i++) {
            queryData.push([params[i]]);
        }
    } else {
        queryData.push(params);
    }

    connection.query(query, [queryData], function (err, result) {
        callback(err, result);
    });

};

exports.getLocationsInCities = function(params, callback) {
    console.log(params);
    var cities = params.inot_city;
    var states = params.inot_state;
    var query = "";
    if (cities.constructor === Array) {
        for (var i = 0; i < states.length; i++) {
            query += 'SELECT * FROM p1_address WHERE city IN (' +
                connection.escape(cities) + ') AND state = ' +
                connection.escape(states[i]) + ';';
        }
    } else {
        query += 'SELECT * FROM p1_address WHERE city = ' +
            connection.escape(cities) + ' AND state = ' +
            connection.escape(states) + '';
    }

    console.log("Final query data...", query);
    connection.query(query, function (err, result) {
        console.log(result);
        callback(err, result);
    });

};