var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var login = require('../model/login.js');


router.get('/', function (req, res) {
    var msg = "You are already logged in.";
    global.sessionChecker(req, res, msg, function () {
        res.render('login/login');
    });
});

router.post('/', function(req, res) {
    login.loginUser(req.body.inot_email, function(err, result){
        if (err) {
            console.log(err);
            res.render('./dberror', {error: err});
        } else {
            bcrypt.compare(req.body.inot_pass, result[0].password, function (bcryptErr, bcryptRes) {
                if (bcryptRes == true) {
                   req.session.user = result[0].first_name;
                   global.setSessionLocal(req, res);
               }
               res.render('./index', {loginSuccess: bcryptRes});
            });
        }
    });
});

module.exports = router;