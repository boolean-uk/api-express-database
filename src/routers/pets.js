const express = require("express");
const router = express.Router();
const {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
} = require("../controllers/pets.js");

// GET route to retrieve all pets from the database
router.get("/", async (req, res) => {
  const pets = await getAllPets();
  res.json({ pets });
});

// GET route to retrieve a specific pet by its ID
router.get("/:id", async (req, res) => {
  const pet = await getPetById(req.params.id);
  res.status(200).json({ pet });
});

// POST route to create a new pet in the database
router.post("/", async (req, res) => {
  const newPet = await createPet(req.body);
  res.status(201).json({ pet: newPet });
});

// PUT route to update an existing pet by its ID
router.put("/:id", async (req, res) => {
  const updatedPet = await updatePet(req.params.id, req.body);
  res.status(201).json({ pet: updatedPet });
});

// DELETE route to remove a pet from the database by its ID
router.delete("/:id", async (req, res) => {
  const deletedPet = await deletePet(req.params.id);
  res.status(201).json({ pet: deletedPet });
});

module.exports = router;
