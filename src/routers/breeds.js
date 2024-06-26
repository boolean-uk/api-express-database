const express = require('express')
const router = express.Router()

const { getAllBreedsController } = require('../controllers/breedsControllers')

router.use('/', getAllBreedsController)

module.exports = router