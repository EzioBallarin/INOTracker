var mysql = require('mysql');
var db = require('./db_connection');

var connection = mysql.createConnection(db.config);