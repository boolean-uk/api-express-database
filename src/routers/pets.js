const express = require("express");
const router = express.Router();
const {
  getAllPets,
  createPet,
  getPetById,
  updatePet,
  deletePet,
} = require("../controllers/pets.js");

router.get("/", async (req, res) => {
    const pets = await getAllPets(req.query);
    res.status(200).json({ pets });
});

router.post("/", async (req, res) => {
    const newPet = await createPet(req.body);
    res.status(201).json({ pet : newPet });
});

router.get("/:id", async (req, res) => {
  const pet = await getPetById(req.params.id);
  res.status(200).json({ pet });
});

router.put("/:id", async (req, res) => {
  const updatedPet = await updatePet(req.params.id, req.body);
  res.status(201).json({ pet : updatedPet });
});

router.delete("/:id", async (req, res) => {
  const deletedPet = await deletePet(req.params.id);
  res.status(201).json({ pet : deletedPet });
});


module.exports = router;