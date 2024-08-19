const express = require("express");
const router = express.Router();
const db = require("../../db");

// GET REQUESTS

router.get("/", async (req, res) => {
  const response = await db.query("select * from pets");
  res.json({ pets: response.rows });
});

router.get("/:id", async (req, res) => {
  const response = await db.query(
    `select * from pets where id = ${req.params.id};`
  );
  res.json({ pet: response.rows[0] });
});

// POST REQUESTS

router.post("/", async (req, res) => {
  let postedPet = req.body;
  const response = await db.query(
    `INSERT INTO pets (name, age, type, breed, has_microchip) VALUES ('${postedPet.name}', '${postedPet.age}', '${postedPet.type}', '${postedPet.breed}', '${postedPet.has_microchip}') RETURNING *`
  );
  res.status(201).json({ pet: response.rows[0] });
});

// PUT REQUESTS

router.put("/:id", async (req, res) => {
  let postedPet = req.body;
  const response = await db.query(
    `UPDATE pets SET (name, age, type, breed, has_microchip) = ('${postedPet.name}', '${postedPet.age}', '${postedPet.type}', '${postedPet.breed}', '${postedPet.has_microchip}') WHERE id = ${req.params.id} RETURNING *`
  );
  res.status(201).json({ pet: response.rows[0] });
});

// DELETE REQUESTS

router.delete("/:id", async (req, res) => {
  const response = await db.query(
    `DELETE FROM pets WHERE id = ${req.params.id} RETURNING *;`
  );
  res.status(201).json({ pet: response.rows[0] });
});

module.exports = router;
