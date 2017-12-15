var express = require('express');
var router = express.Router();
var visits = require('../model/visits');

router.get('/', function(req, res){
    if (typeof req.session.user === 'undefined') {
        res.render('visits/visits', {noUser: true, message: "Please login to view your visits", newVisit: false});
    } else {
        visits.getUserVisits(req.session.user.user_id, function (err, result) {
            res.render('visits/visits', {visits: result[0], newVisit: false});
        });
    }
});

router.post('/new', function (req, res) {
    var visit_data = [
        req.session.user.user_id,
        req.body.inot_new_visit_store_num,
        req.body.inot_new_visit_timestamp,
        req.body.inot_new_visit_reason,
        req.body.inot_new_visit_meal,
        req.body.inot_new_visit_note
    ];
    visits.newUserVisit(visit_data, function (err, result) {
        if (err) {
            console.log(err);
            res.render('dberror', {message: err});
        } else {
            res.locals.newVisit = true;
            res.redirect('/visits');
        }
    });
});

router.post('/delete', function (req, res) {
    var visit_delete_data = {
        user_id: req.session.user.user_id,
        visit_id: req.body.inot_visit_num,
        store_num: req.body.inot_store_num
    };
    visits.deleteVisit(visit_delete_data, function (err, result) {
        if (err) {
            console.log(err);
            res.render('dberror', {error: err});
        } else {
            res.locals.deletedVisit = true;
            res.redirect('/visits')
        }
    })
});

module.exports = router;
