const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
    const { type } = req.query;
    let query = "SELECT * FROM pets";
    const values = [];
    if (type) {
      values.push(type);
      query += " WHERE type ILIKE $1";
    }
    try {
      const result = await db.query(query, values);
      res.json({ pets: result.rows });
    } catch (error) {
      res.status(500).json({ error });
      console.error(error);
    }
  });


router.post("/", async (req, res) => {
    const { name, age, type, breed, microchip } = req.body;
    const result = await db.query(
      'INSERT INTO pets (name, age, type, breed, microchip)' +
        "VALUES ($1, $2, $3, $4, $5)" +
        "RETURNING *",
      [name, age, type, breed, microchip]
    );
    res.status(201).json({ pet: result.rows[0] });
  });

  router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const result = await db.query("SELECT * FROM pets WHERE id = $1", [id]);
    res.json({ pet: result.rows[0] });
  });

  router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { name, age, type, breed, microchip } = req.body;
    const result = await db.query(
      'UPDATE pets SET name = $2, age = $3, type = $4, breed = $5, microchip = $6 WHERE id = $1 RETURNING *',
      [id, name, age, type, breed, microchip]
    );
    console.log(result)
    res.status(201).json({ pet: result.rows[0] });
  });

  router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const result = await db.query('DELETE FROM pets WHERE id = $1 RETURNING *', [id])
    res.status(201).json({pet: result.rows[0]})
  })
module.exports = router;
