import express = require('express');
import PngParser = require('./PngParser');

var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
    PngParser.parseImage('sprites/' + req.params.id + '.png', (err, cells) => {
        if (err) {
            console.log('error!');
            res.render('error', { error: err });
        } else {
            res.render('index', { cells:  cells });
        }
    });
});

export = router;
