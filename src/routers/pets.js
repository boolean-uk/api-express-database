const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const pets = await db.query("SELECT * FROM pets");

  return res.status(200).send({ pets: pets.rows });
});

router.post("/", async (req, res) => {
  const { name, age, type, breed, has_microchip } = req.body;

  const newPet = await db.query(
    "INSERT INTO pets (name, age, type, breed, has_microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, age, type, breed, has_microchip]
  );

  return res.status(201).send({ pet: newPet.rows[0] });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const pet = await db.query("SELECT * FROM pets WHERE id = $1", [id]);

  return res.status(200).send({ pet: pet.rows[0] });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, type, breed, has_microchip } = req.body;

  const updatedPet = await db.query(
    "UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, has_microchip = $5 WHERE id = $6 RETURNING *",
    [name, age, type, breed, has_microchip, id]
  );

  return res.status(201).send({ pet: updatedPet.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const deletedPet = await db.query(
    "DELETE FROM pets WHERE id = $1 RETURNING *",
    [id]
  );

  return res.status(201).send({ pet: deletedPet.rows[0] });
});

module.exports = router;
