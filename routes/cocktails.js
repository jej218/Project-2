var router = require('express').Router();
var cocktailsCtrl = require('../controllers/cocktails');

router.get('/', cocktailsCtrl.index);
router.get('/new', cocktailsCtrl.new);
router.get('/:id', cocktailsCtrl.show);
router.get('/:id/edit', cocktailsCtrl.edit);
router.put('/:id', cocktailsCtrl.update);
router.post('/', cocktailsCtrl.create);
router.delete('/:id', cocktailsCtrl.delete);

module.exports = router;