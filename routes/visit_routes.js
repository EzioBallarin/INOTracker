var express = require('express');
var router = express.Router();
var visits = require('../model/visits');

router.get('/', function(req, res){
    if (typeof req.session.user === 'undefined') {
        res.render('visits/visits', {noUser: true, message: "Please login to view your visits"});
    } else {
        visits.getUserVisits(req.session.user.user_id, function (err, result) {
            console.log(err);
            console.log(result);
            res.render('visits/visits', {visits: result[0]});
        });
    }
});

router.post('/new', function (req, res) {
    console.log(req.body);
    res.redirect('/visits');
});

module.exports = router;
