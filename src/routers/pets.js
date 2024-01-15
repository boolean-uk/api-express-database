const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const pets = await db.query("SELECT * FROM pets");
  res.json({ pets: pets.rows });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.query("SELECT * FROM pets WHERE id = $1", [id]);
  res.json({ pet: result.rows[0] });
});

module.exports = router;
