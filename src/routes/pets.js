const express = require('express');
const router = express.Router();

const controller = require('../controllers/pets.controller');

router.get('/', controller.getAllPets);

router.get('/:id', controller.getPetById);

router.post('/', controller.postPet);

router.put('/:id', controller.updatePet);

router.delete('/:id', controller.deletePet);

module.exports = router;
