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

// Update a pet
router.put('/:id', async (req, res, next) => {
  const { id } = req.params
  const { name, age, type, breed, has_microchip } = req.body

  await db.query(
    'update pets set name = $1, age = $2, type = $3, breed = $4, has_microchip = $5 where id = $6',
    [name, age, type, breed, has_microchip, id]
  )

  const updatedPet = await db.query('select * from pets where id = $1', [id])

  res.status(201).json({ pet: updatedPet.rows[0] })
})

// Delete a pet
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  const deletedPet = await db.query('select * from pets where id = $1', [id])

  await db.query('delete from pets where id = $1', [id])

  res.status(201).json({ pet: deletedPet.rows[0] })
})

module.exports = router
