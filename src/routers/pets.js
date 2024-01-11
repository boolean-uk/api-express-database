const express = require("express");
const router = express.Router();
const petControllers = require("../controllers/pets");

router.get("/", petControllers.getAllPets);
router.post("/", petControllers.addPet);
router.get("/:id", petControllers.getPetBy);
router.delete("/:id", petControllers.deletePet);
router.put("/:id", petControllers.editPet);

module.exports = router;
