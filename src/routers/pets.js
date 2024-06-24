const express = require('express')
const router = express.Router()

const { getPetsController, getPetsByIdController, updatePetByIdController } = require('../controllers/petsControllers')

router.get('/', getPetsController)

router.get('/:id', getPetsByIdController)

router.put('/:id', updatePetByIdController)

module.exports = router 