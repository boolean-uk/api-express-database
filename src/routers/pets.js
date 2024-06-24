const express = require('express')
const router = express.Router()

const { getPetsController, getPetsByIdController } = require('../controllers/petsControllers')

router.get('/', getPetsController)

router.get('/:id', getPetsByIdController)

module.exports = router 