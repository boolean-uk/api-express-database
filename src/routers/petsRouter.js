const express = require('express')
const router = express.Router()
const db = require('../../db')

// Retrieve all pets
router.get('/', async (req, res, next) => {
  const { type } = req.query

  let pets = null

  if (type) {
    pets = await db.query('select * from pets where type = $1', [type])
  }

  if (!type) {
    pets = await db.query('select * from pets')
  }

  res.status(200).json({ pets: pets.rows })
})

// Create a pet
router.post('/', async (req, res, next) => {
  const { name, age, type, breed, has_microchip } = req.body

  await db.query(
    'insert into pets (name, age, type, breed, has_microchip) values ($1, $2, $3, $4, $5)',
    [name, age, type, breed, has_microchip]
  )

  const createdPet = await db.query('select * from pets where name = $1', [
    name
  ])

  res.status(201).json({ pet: createdPet.rows[0] })
})

// Get a pet by ID
router.get('/:id', async (req, res, next) => {
  const { id } = req.params

  const pet = await db.query('select * from pets where id = $1', [id])

  res.status(200).json({ pet: pet.rows[0] })
})

module.exports = router
