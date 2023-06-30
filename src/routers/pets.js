const express = require('express')
const router = express.Router()
const db = require('../../db')

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM pets')
  res.json({ pets: result.rows })
})
router.post('/', async (req, res) => {
  const { name, age, type, breed, microchip } = req.body
  const result = await db.query(
    'INSERT INTO pets (name, age, type, breed, microchip)' +
      'VALUES ($1, $2, $3, $4, $5)' +
      'RETURNING *',
    [name, age, type, breed, microchip]
  )
  res.status(201).send({ pet: result.rows[0] })
})
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const result = await db.query('SELECT * FROM pets WHERE id = $1', [id])
  res.json({ pet: result.rows[0] })
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const { name, age, type, breed, microchip } = req.body
  const result = await db.query('UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, microchip = $5' + 
  ' WHERE id = $6 ' + 'RETURNING *', [ name, age, type, breed, microchip, id ])
  res.status(201).json({ pet: result.rows[0] });
})
router.delete('/:id', async(req, res) => {
  const { id } = req.params
  const result = await db.query('DELETE FROM pets WHERE id = $1 RETURNING *', [id])
  res.status(201).send({pet: result.rows[0]})

})
module.exports = router