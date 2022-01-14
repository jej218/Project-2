const express = require('express');
const router = express.Router();
const varietiesCtrl = require('../controllers/varieties');

router.post('/ingredients/:id/varieties', varietiesCtrl.create);
router.delete('/varieties/:id', varietiesCtrl.delete);

module.exports = router;