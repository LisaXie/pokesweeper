import express = require('express');
import PngParser = require('./PngParser');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/001');
});

router.get('/pokedex', function(req, res, next) {
    res.render('pokedex');
})

router.get('/:id', function(req, res, next) {
    PngParser.parseImage('sprites/' + req.params.id + '.png', (err, cells) => {
        if (err) {
            console.log('error!');
            res.render('error', { error: err });
        } else {
            res.render('index', { cells:  cells, id: req.params.id });
        }
    });
});

export = router;
