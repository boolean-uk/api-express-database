const express = require("express");
const router = express.Router();
const db = require("../../db");

// GET All pets
router.get("/", async (req, res) => {
  const str = "SELECT * FROM pets;";
  const values = [];

  const data = await db.query(str, values);
  const pets = data.rows;
  res.json({ pets });
});

// POST - Create a pet
router.post("/", async (req, res) => {
  const { name, age, type, breed, microchip } = req.body;
  const values = [name, age, type, breed, microchip];

  const str =
    "INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *;";

  const data = await db.query(str, values);
  res.status(201).json({ pet: data.rows[0] });
});

// GET a pet by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const values = [id];

  const str = "SELECT * FROM pets WHERE id = $1;";
  const data = await db.query(str, values);
  res.json({ pet: data.rows[0] });
});

// PUT - Update a pet by ID
router.put("/:id", async (req, res) => {
  // const id = req.params.id
  const { name, age, type, breed, microchip } = req.body;
  const values = [req.params.id, name, age, type, breed, microchip];

  const str =
    "UPDATE pets SET name = $2, age = $3, type = $4, breed = $5, microchip = $6 WHERE id = $1 RETURNING *;";

  const data = await db.query(str, values);
  res.status(201).json({ pet: data.rows[0] });
});

// DELETE - Delete a pet by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const values = [id];

  const str = "DELETE FROM pets WHERE id = $1 RETURNING *;";
  const data = await db.query(str, values);
  res.status(201).json({ pet: data.rows[0] });
});

module.exports = router;
