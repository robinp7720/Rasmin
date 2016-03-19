var express = require('express');
var router = express.Router();

var os = require("os");

var container = require('../../container');

var async = require('async');


router.get('/start/:name', function(req, res, next) {
    res.json(container.start(req.params.name));
});

router.get('/stop/:name', function(req, res, next) {
    res.json(container.stop(req.params.name));
});

router.get('/status/:name', function(req, res, next) {
    res.json(container.status(req.params.name));
});

module.exports = router;
