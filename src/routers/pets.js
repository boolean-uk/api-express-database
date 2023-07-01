const express = require("express");
const router = express.Router();
const db = require("../../db/index");

// Retrieve all pets
router.get("/", async (req, res) => {
  const result = await db.query(`SELECT * FROM pets`);
  if (result) {
    res.json({ pets: result.rows });
  } else {
    res.send("No pets exist");
  }
});

// Get a pet by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.query(`SELECT * FROM pets WHERE id = $1`, [id]);
  if (result.rows.length) {
    res.json({ pet: result.rows[0] });
  } else {
    res.send(`Pet with the id of ${id} does not exist`);
  }
});

// Create a pet
router.post("/", async (req, res) => {
  const { name, age, type, breed, microchip } = req.body;
  const result = await db.query(
    `INSERT INTO pets (name, age, type, breed, microchip)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
    [name, age, type, breed, microchip]
  );
  res.status(201).json({ pet: result.rows[0] });
});

// Update a pet
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, age, type, breed, microchip } = req.body;
  const result = await db.query(
    `
    UPDATE pets
    SET name = $2, age = $3, type = $4, breed = $5, microchip = $6
    WHERE id = $1
    RETURNING *`,
    [id, name, age, type, breed, microchip]
  );
  res.status(201).json({ pet: result.rows[0] });
});

// Delete a pet
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.query(
    `
  DELETE FROM pets
  WHERE id = $1
  RETURNING *`,
    [id]
  );
  res.status(201).json({ pet: result.rows[0] });
});

module.exports = router;
