var express = require('express');
var router = express.Router();

var apt = require('node-apt-get');

var async = require('async');


router.get('/install/:name', function(req, res, next) {

    apt.install(req.params.name, {
        'assume-yes': true
    }).on('close', function(code) {
        res.json({
            action: "install",
            package: req.params.name,
            code: code
        });
    });
});


router.get('/purge/:name', function(req, res, next) {
    apt.purge(req.params.name, {
        'assume-yes': true
    }).on('close', function(code) {
        res.json({
            action: "purge",
            package: req.params.name,
            code: code
        });
    });
});

router.get('/update', function(req, res, next) {
    apt.update().on('close', function(code) {
        res.json({
            action: "update",
            code: code
        });
    });
});

router.get('/upgrade', function(req, res, next) {
    apt.upgrade({
        'assume-yes': true
    }).on('close', function(code) {
        res.json({
            action: "upgrade",
            code: code
        });
    });
});

module.exports = router;
