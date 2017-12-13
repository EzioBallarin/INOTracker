var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.session.user);
    res.render('index');
});

router.get('/about/', function(req, res){
  res.render('about/about')
});

module.exports = router;
