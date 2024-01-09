const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM pets");
  return res.json({ pets: result.rows });
});

router.post("/", async (req, res) => {
  const { name, age, type, breed, has_microchip } = req.body;
  await db.query(
    "INSERT INTO pets (name, age, type, breed, has_microchip ) VALUES ($1, $2, $3, $4, $5)",
    [name, age, type, breed, has_microchip]
  );
  const result = await db.query("SELECT * FROM pets WHERE name = $1", [name]);
  return res.status(201).json({ pet: result.rows[0] });
});

router.get("/:id", async (req, res) => {
    const { id } = req.params
    const result = await db.query("SELECT * FROM pets WHERE id = $1", [id]);
    return res.json({ pet: result.rows[0] });
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const toBeDeleted = await db.query("SELECT * FROM pets WHERE id = $1", [id]);
    const result = await db.query("DELETE FROM pets WHERE id = $1", [id]);
    return res.status(201).json({ pet: toBeDeleted.rows[0] });
});

module.exports = router;
