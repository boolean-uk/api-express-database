const express = require('express')
const router = express.Router()
const petsController = require('../controllers/pets')

router.get('/', petsController.getAllPets)

router.post('/', petsController.addNewPet)

router.get('/:id', petsController.getPetByID)

router.put('/:id', petsController.updatePet)

router.delete('/:id', petsController.deletePet)

module.exports = router