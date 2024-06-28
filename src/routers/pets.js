const express = require("express");
const router = express.Router();

const {
  getAllPets,
  createNewPet,
  listPet,
  updatePet,
  deletePet,
} = require("../../controllers/petControllers.js");

router.get("/", getAllPets);
router.get("/:id", listPet);
router.post("/", createNewPet);
router.put("/:id", updatePet);
router.delete("/:id", deletePet);

module.exports = router;
