var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Rasmin' });
});

router.get('/documentation', function(req, res, next) {
  res.render('pages/doc');
});

module.exports = router;
