const express = require('express');
const router = express.Router();
const ingredientsCtrl = require('../controllers/ingredients');

router.get('/ingredients', ingredientsCtrl.index);
router.get('/ingredients/new', ingredientsCtrl.new);
router.get('/ingredients/:id', ingredientsCtrl.show);
router.get('/ingredients/:id/edit', ingredientsCtrl.edit);
router.put('/ingredients/:id', ingredientsCtrl.update);
router.post('/ingredients', ingredientsCtrl.create);
router.post('/cocktails/:id/ingredients', ingredientsCtrl.addToCocktail);
router.delete('/cocktails/:id/ingredients/:id', ingredientsCtrl.removeFromCocktail);


module.exports = router;