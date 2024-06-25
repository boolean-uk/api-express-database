const express = require('express')
const router = express.Router()

const getAllBreeds = require('../controllers/breeds.js')

// GET BY BREED
router.get('/', getAllBreeds)

module.exports = router