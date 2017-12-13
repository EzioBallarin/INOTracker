var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var register = require('../model/register.js');

router.get('/', function(req, res){
    console.log("registering...");
    res.render('register/register');
});

router.post('/new', function (req, res) {
    bcrypt.hash(req.body.inot_pass, 5, function (err, bcryptedPass) {
        req.body.inot_pass = null;
        req.body.bcryptedPass = bcryptedPass;
        register.registerNewUser(req.body, function(err, result) {
            if (err) {
                console.log(err);
                res.render('./dberror', {error: err});
            } else {
                console.log(bcryptedPass);
                res.render('./index', {newAccount: true});
            }
        });
    })
});

module.exports = router;