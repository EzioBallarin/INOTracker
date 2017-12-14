var express = require('express');
var router = express.Router();
var visits = require('../model/visits');

router.get('/', function(req, res){
    if (typeof req.session.user === 'undefined') {
        res.render('visits/visits', {noUser: true, message: "Please login to view your visits"});
    }
    visits.getUserVisits(req.session.user.user_id, function (err, result) {
        console.log(err);
        console.log(result);
        res.render('visits/visits', {visits: result[0]});
    });
});

module.exports = router;
