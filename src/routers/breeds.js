const express = require("express");
const router = express.Router();

const breedsController = require('../controllers/breeds');

router.get('/', breedsController.getBreeds);




module.exports = router;