const express = require("express");
const router = express.Router();

const { fetchAllPets, fetchPetById } = require("../controllers/pets");

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

module.exports = router;
