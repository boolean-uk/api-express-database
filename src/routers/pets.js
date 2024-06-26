const express = require('express')
const router = express.Router()

const { getPetsController, getPetsByIdController, updatePetByIdController, addPetController, deletePetController } = require('../controllers/petsControllers')

router.get('/', getPetsController)

router.get('/:id', getPetsByIdController)

router.put('/:id', updatePetByIdController)

router.post('/', addPetController)

router.delete('/:id', deletePetController)

module.exports = router 