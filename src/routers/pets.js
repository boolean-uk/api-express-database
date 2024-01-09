const express = require('express')
const router = express.Router()
const db = require("../../db");

router.post('/', async (req, res) => {
    const { name, age, type, breed, has_microchip } = req.body;
  
    const newpet = await db.query(
      'INSERT INTO pets (name, age, type, breed, has_microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, age, type, breed, has_microchip]
    )
    res.status(201).json({ pet: newpet.rows[0] })
  })

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM pets WHERE id = $1", [id]);
    res.json({ pet: result.rows[0] });
  });

  router.get('/', async (req, res) => {
    const pets = await db.query('SELECT * FROM pets')
    res.json({ pets: pets.rows })
  })

  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, type, breed, has_microchip } = req.body;
  
    const updatedpet = await db.query(
      'UPDATE pets SET name = $2, age = $3, type = $4, breed = $5, has_microchip = $6 WHERE id = $1 RETURNING *',
      [id, name, age, type, breed, has_microchip]
    )
  
    res.status(201).json({ pet: updatedpet.rows[0]})
  })

  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    const deletedpet = await db.query('DELETE FROM pets WHERE id = $1 RETURNING *', [id]);
  
    res.status(201).json({ pet: deletedpet.rows[0] })
  })

  module.exports = router