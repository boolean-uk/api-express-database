const express = require('express');
const router = express.Router();
const breedControllers = require('../controllers/breeds');

router.get('/', breedControllers.getAllBreeds);

module.exports = router;
