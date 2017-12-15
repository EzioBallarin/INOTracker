var express = require('express');
var router = express.Router();

var images = require('../model/images.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    images.getLocationImages(function(err, result){
        if (err) {
            console.log(err);
            res.render('dberror', {error: err});
        } else {
            res.render('index', {images: result});
        }
    });
});

router.get('/about/', function(req, res){
  res.render('about/about')
});

module.exports = router;
