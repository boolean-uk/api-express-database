const express = require('express')
const router = express.Router()

const { getAllPets, createNewPet, getPetById, updatePet, deletePet } = require('../controllers/pets.js')

// GET ALL PETS (INC. BY TYPE)
router.get('/', getAllPets)

// CREATE A PET
router.post('/', createNewPet)

// GET A PET BY ID
router.get('/:id', getPetById)

// UPDATE A PET (BY ID)
router.put('/:id', updatePet)

// DELETE A PET (BY ID)
router.delete('/:id', deletePet)

module.exports = router