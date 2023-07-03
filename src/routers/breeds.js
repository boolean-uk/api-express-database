const express = require('express')
const router = express.Router()
const breedsController = require('../controllers/breedsController')

router.get('/', breedsController.getAllBreeds)

module.exports = router