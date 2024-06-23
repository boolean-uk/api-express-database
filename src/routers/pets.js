const express = require('express')
const router = express.Router()
const { getPets, createPet, getPetById , deletePetById, updatePetById} = require('../controllers/pets')

router.get('/', getPets)

router.post('/', createPet)

router.get('/:id', getPetById)

router.delete('/:id', deletePetById)

router.put('/:id', updatePetById)

module.exports = router
