const express = require('express')
const router = express.Router()
const db = require("../../db");
const petsController = require("../controllers/pets.controllers")


// GET
router.get('/', petsController.getAllPets)
router.get('/:id', petsController.getPetById)

// POST
router.post('/', petsController.addPet)

// PUT
router.put('/:id', petsController.updatePet)

// DELETE
router.delete('/:id', petsController.deletePet)

module.exports = router