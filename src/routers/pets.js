const express = require('express');
const router = express.Router();
const petControllers = require('../controllers/pets');

router.get('/', petControllers.getAllPets);

router.get('/:id', petControllers.getPetById);

router.post('/', petControllers.createPet);

router.put('/:id', petControllers.updatePetById);

router.delete('/:id', petControllers.deletePetById);

module.exports = router;
