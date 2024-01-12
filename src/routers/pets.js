const express = require("express");
const router = express.Router();

const {
  fetchAllPets,
  fetchPetById,
  addPet,
  modifyPet,
  removePet,
} = require("../controllers/pets");

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

// PUT route to update an existing pet by its ID
router.put("/:id", async (req, res) => {
  const modifiedPet = await modifyPet(req.params.id, req.body);
  res.status(201).json({ pet: modifiedPet });
});

// DELETE route to remove a pet from the database by its ID
router.delete("/:id", async (req, res) => {
  const removedPet = await removePet(req.params.id);
  res.status(201).json({ pet: removedPet });
});

module.exports = router;
