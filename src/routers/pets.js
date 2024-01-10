const express = require("express");
const router = express.Router();

const db = require("../../db");

const petsController = require("../controllers/pets_controller.js");

router.get("/", petsController.getAllPets);

router.get("/:id", petsController.getPetById);

// router.get("/:id", async (req, res) => {
//   const { id } = req.params;

//   const pet = await db.query("SELECT * FROM pets WHERE id = $1", [id]);

//   res.json({ pet: pet.rows[0] });
// });

router.post("/", async (req, res) => {
  const { name, age, type, breed, has_microchip } = req.body;

  const newPet = await db.query(
    "INSERT INTO pets (name, age, type, breed, has_microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, age, type, breed, has_microchip]
  );

  res.status(201).json({ pet: newPet.rows[0] });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, type, breed, has_microchip } = req.body;

  const updatedPet = await db.query(
    "UPDATE pets SET name = $2, age = $3, type = $4, breed = $5, has_microchip = $6 WHERE id = $1 RETURNING *",
    [id, name, age, type, breed, has_microchip]
  );

  res.status(201).json({ pet: updatedPet.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const deletedPet = await db.query(
    "DELETE FROM pets WHERE id = $1 RETURNING *",
    [id]
  );

  res.status(201).json({ pet: deletedPet.rows[0] });
});

module.exports = router;
