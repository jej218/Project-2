var router = require('express').Router();
var cocktailsCtrl = require('../controllers/cocktails');

router.get('/', cocktailsCtrl.index);
router.get('/new', isLoggedIn, cocktailsCtrl.new);
router.get('/:id', cocktailsCtrl.show);
router.post('/', isLoggedIn, cocktailsCtrl.create);


function isLoggedIn(req, res, next) {
    // req.isAuthenticated() this is given to us by passport
    // it returns true or false
    if (req.isAuthenticated()) return next(); // next() go to the next function in middleware, above situation studentsCtrl.addFact
    res.redirect('/auth/google'); // redirect them to login FIXME:
}

module.exports = router;