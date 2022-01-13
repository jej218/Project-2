const express = require('express');
const router = express.Router();
const bottlesCtrl = require('../controllers/bottles');

router.post('/ingredients/:id/bottles', bottlesCtrl.create);
router.delete('/bottles/:id', bottlesCtrl.delete);

module.exports = router;