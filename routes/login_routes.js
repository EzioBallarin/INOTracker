var express = require('express');
var router = express.Router();
var login = require('../model/login.js');

router.get('/', function (req, res) {
    res.render('login/login');
});

router.post('/', fucntion(req, res){
    console.log("posted login");
    res.render('login/login');
});

module.exports = router;