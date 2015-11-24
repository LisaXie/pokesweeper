import express = require('express');
import PngParser = require('./PngParser');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    PngParser.parseImage('1.png', (cells) => {
        console.log('cells:');
        console.log(cells);
        res.render('index', { cells:  cells });
    });
});

export = router;
