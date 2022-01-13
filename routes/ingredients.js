const express = require('express');
const router = express.Router();
const ingredientsCtrl = require('../controllers/ingredients');

router.get('/', ingredientsCtrl.index);
router.get('/new', ingredientsCtrl.new);
router.get('/:id', ingredientsCtrl.show);
router.post('/', ingredientsCtrl.create);


module.exports = router;