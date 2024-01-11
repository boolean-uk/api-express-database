const express = require("express");
const router = express.Router();

const { fetchAllPets, fetchPetById, addPet } = require("../controllers/pets");

// GET route to retrieve all pets from the database
router.get("/", async (req, res) => {
  const pets = await fetchAllPets();
  res.json({ pets });
});
// GET route to retrieve a specific pet by its ID
router.get("/:id", async (req, res) => {
  const pet = await fetchPetById(req.params.id);
  res.status(200).json({ pet });
});

// POST route to add a new pet in the database
router.post("/", async (req, res) => {
  const theNewPet = await addPet(req.body);
  res.status(201).json({ pet: theNewPet });
});

module.exports = router;
