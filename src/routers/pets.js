const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const pets = await db.query("SELECT * FROM pets");
  res.json({ pets: pets.rows });
});

router.post("/", async (req, res) => {
  const { name, age, type, breed, microchip, pages } = req.body;
  const pet = await db.query(`
    INSERT INTO pets (name, age, type, breed, microchip)
    VALUES ('${name}', ${age}, '${type}', '${breed}', ${microchip})
    RETURNING *
    `);
  res.status(201).json({ pet: pet.rows[0] });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const pet = await db.query(`SELECT * FROM pets WHERE id = '${id}' `);
  res.json({ pet: pet.rows[0] });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, type, breed, microchip } = req.body;
  const pet = await db.query(`
    UPDATE pets 
    SET name = '${name}', age = ${age}, type = '${type}', breed = '${breed}', microchip = ${microchip}
    WHERE id = ${id}
    RETURNING *
    `);
  res.status(201).json({ pet: pet.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.query(`
    DELETE FROM pets WHERE id = ${id}
    RETURNING *
    `);
  res.status(201).json({ pet: result.rows[0] });
});

module.exports = router;
