const express = require("express");
const router = express.Router();
const petsController = require("../contollers/pets");

router.get("/", petsController.getPets);

router.post("/", petsController.postPet);

router.get("/:id", petsController.getPetById);

router.put("/:id", petsController.updatePetById);

router.delete("/:id", petsController.deletePetById);

module.exports = router;
