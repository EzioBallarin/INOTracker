var express = require('express');
var router = express.Router();
var locations = require('../model/locations.js');

router.get('/', function(req, res){
    locations.getLocationStates(function (err, result) {
        if (err) {
            console.log(err);
            res.render('dberror', {error: err});
        } else {
            res.render('locations/locations', {locations: result[0]});
        }
    });
});

router.post('/state', function (req, res) {
    var states = req.body.inot_state;
    locations.getLocationsInStates(states, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

router.post('/city', function(req, res){
    // req.body holds two arrays
    // the first is the list of cities,
    // the second is their corresponding state
    locations.getLocationsInCities(req.body, function(err, result){
        if (err){
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = router;