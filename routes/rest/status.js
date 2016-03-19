var express = require('express');
var router = express.Router();

var fs = require('fs');

var os = require("os");

var container = require('../../container');

var async = require('async');


router.get('/uptime', function(req, res, next) {
    res.json({
        uptime: os.uptime()
    });
});

router.get('/load', function(req, res, next) {
    res.json({
        load: os.loadavg()
    });
});

router.get('/memory', function(req, res, next) {
    res.json({
        free: os.freemem(),
        total: os.totalmem()
    });
});

router.get('/hostname', function(req, res, next) {
    res.json({
        hostname: os.hostname()
    });
});

router.put('/hostname', function(req, res, next) {
    var fs = require('fs');
    fs.writeFile("/etc/hostname", req.body.hostname, function(err) {
        if(err) {
            res.json({
                error: err,
                hostname: os.hostname()
            });
        } else {
            res.json({
                hostname: os.hostname()
            });
        }
    });
});


router.get('/cpu', function(req, res, next) {
    res.json(os.cpus());
});

router.get('/network', function(req, res, next) {
    res.json(os.networkInterfaces());
});

module.exports = router;
