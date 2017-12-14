var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var login = require('../model/login.js');

router.get('/', function (req, res) {
    if (!req.cookies.user_sid || !req.session.user) {
        var msg = "You are not logged in.";
        res.render('index', {message: msg});
    } else {
        global.endSession(req, res);
    }
});

module.exports = router;