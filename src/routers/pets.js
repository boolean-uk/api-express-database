const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM pets");
  res.json({ data: result.rows });
});

router.post("/", async (req, res) => {
  const { name, age, type, breed, microchip, pages } = req.body;
  const result = await db.query(`
    INSERT INTO pets (name, age, type, breed, microchip)
    VALUES ('${name}', ${age}, '${type}', '${breed}', ${microchip})
    RETURNING *
    `);
  res.json({ data: result.rows });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.query(`SELECT * FROM books WHERE id = '${id}' `);
  res.json({ data: result.rows });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, type, breed, microchip } = req.body;
  const result = await db.query(`
    UPDATE pets 
    SET name = '${name}', age = ${age}, type = '${type}', breed = '${breed}', microchip = ${microchip}
    WHERE id = ${id}
    RETURNING *
    `);
  res.json({ data: result.rows });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.query(`
    DELETE FROM pets WHERE id = ${id}
    RETURNING *
    `);
  res.json({ data: result.rows });
});

module.exports = router;
