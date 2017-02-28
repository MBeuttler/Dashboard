var express = require('express');
var router = express.Router();

var drinks = {
        "result": [
            {
                "name": "Pangalaktischer Donnergurgler",
                "amount": 45
            },
            {
                "name": "Erdbeer-Spritz",
                "amount": 104
            },
            {
                "name": "Zitronen Rülpser",
                "amount": 67
            },
            {
                "name": "Bier",
                "amount": 200
            },
            {
                "name": "Schnaps",
                "amount": 5
            }
        ]
    };

var drinksHours = {
        "result": [
            {
                "name": "Pangalaktischer Donnergurgler",
                "amount": 4
            },
            {
                "name": "Erdbeer-Spritz",
                "amount": 10
            },
            {
                "name": "Zitronen Rülpser",
                "amount": 6
            }
        ]
    };

var drinksTop10 = {
        "result": [
            {
                "name": "Pangalaktischer Donnergurgler",
                "rank": 1
            },
            {
                "name": "Erdbeer-Spritz",
                "rank": 8
            },
            {
                "name": "Zitronen Rülpser",
                "rank": 4
            }
        ]
    };

router.get('/', function(req, res, next) {
    var response = {};
    if (req.query.hours != undefined && !isNaN(req.query.hours) ) {
        response = drinksHours;
    }
    else {
        response = drinks;
    }
    res.json(response);   
});

router.get('/top10', function(req, res, next) {
    var response = {};
    if (req.query.day != undefined) {
        response = drinksTop10;
    }
    else {
        response = drinksTop10;
    }
    res.json(response);
});

module.exports = router;