var express = require('express');
var router = express.Router();
var register = require('../model/register.js');

router.get('/', function(req, res){
    console.log("registering...");
    res.render('register/register');
});

module.exports = router;