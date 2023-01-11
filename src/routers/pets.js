const express = require('express')
const id = require('faker/lib/locales/id_ID')
const router = express.Router()
const db = require('../../db')

router.get('/', async (req, res) => {
  const { type } = req.query
  if (type) {
    const result = await db.query('SELECT * FROM pets WHERE type = $1', [type])
    res.json({ pets: result.rows })
    return
  }
  const result = await db.query('SELECT * FROM pets')
  res.json({ pets: result.rows })
})

router.post('/', async (req, res) => {
  const { name, age, type, breed, microchip } = req.body
  const result = await db.query(
    'INSERT INTO pets (name, age, type , breed, microchip) VALUES ($1, $2, $3,$4,$5) RETURNING *',
    [name, age, type, breed, microchip]
  )
  res.status(201).json({ pets: result.rows[0] })
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const result = await db.query('SELECT * FROM pets WHERE id = $1', [id])
  res.json({ pets: result.rows })
})

router.put('/:id', async (req, res) => {
  const { id } = req.params

  const { name, age, type, breed, microchip } = req.body
  const result = await db.query(
    'UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, microchip = $5 WHERE id = $6 RETURNING *',
    [name, age, type, breed, microchip, id]
  )
  res.status(201).json({ pets: result.rows[0] })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const result = await db.query(' DELETE FROM pets WHERE id = $1 RETURNING *', [
    id
  ])
  res.status(201).json({ pets: result.rows[0] })
})

module.exports = router
