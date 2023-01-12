const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM pets");
  res.json({ pets: result.rows });
});

router.post("/", async (req, res) => {
  const { name, age, type, breed, microchip } = req.body;
  const result = await db.query(`INSERT INTO pets
  ( name, age, type, breed, microchip )
  VALUES ('${name}', ${age}, '${type}','${breed}', ${microchip})
  RETURNING * `);
  res.status(201).json({ pet: result.rows[0] });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.query(`
  SELECT * FROM pets
  WHERE id = ${id}`);
  res.json({ pet: result.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await db.query(`DELETE FROM pets
  WHERE id = ${id}
  RETURNING * `);
  res.status(201).json({ pet: result.rows[0] });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, type, breed, microchip } = req.body;
  const result = await db.query(`
  UPDATE pets
  SET name ='${name}', age =${age}, type ='${type}', breed = '${breed}', microchip = ${microchip}
  WHERE id = ${id}
  RETURNING * `);
  res.status(201).json({ pet: result.rows[0] });
});

module.exports = router;
