const express = require('express');
const router = express.Router();

const controller = require('../controllers/breeds.controller');

router.get('/', controller.getAllBreeds);

module.exports = router;
