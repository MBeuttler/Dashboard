var express = require('express');
var router = express.Router();

var juices = {
    "result": [
        {
            "name": "Orangensaft",
            "amount": 80
        },
        {
            "name": "Apfelsaft",
            "amount": 60
        },
        {
            "name": "Erbsenpüree",
            "amount": 10
        }
    ]
};

var juicesPerDay = {
    "result": [
        {
            "name": "Orangensaft",
            "amount": 8
        },
        {
            "name": "Apfelsaft",
            "amount": 6
        },
        {
            "name": "Erbsenpüree",
            "amount": 1
        }
    ]
};

router.get('/', function (req, res, next) {
    var response = {};
    if (req.query.day != undefined) {
        response = juices;
    }
    else {
        response = juicesPerDay;
    }
    res.json(response);
});

module.exports = router;