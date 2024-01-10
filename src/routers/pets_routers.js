const express = require("express");
const router = express.Router();

const petsController = require("../controllers/pets_controller.js");

router.get("/", petsController.getAllPets);

router.get("/:id", petsController.getPetById);

router.post("/", petsController.createPet);

router.put("/:id", petsController.updatePetById);

router.delete("/:id", petsController.deletePet);

module.exports = router;
