const express = require('express')
const router = express.Router()
const db = require('../../db')
const FieldsErrorHandler = require('../helpers/FieldsErrorHandler')
const ErrorConstructor = require('../helpers/ErrorConstructor')

//Global functions
const getPetById = async (id) => {
  const pet = await db.query('select * from pets where id = $1', [id])

  if (pet.rows.length === 0) {
    throw ErrorConstructor(`no pet with id: ${id}`, 404)
  }

  return pet
}

// Retrieve all pets
router.get('/', async (req, res, next) => {
  const { type, page, perPage } = req.query

  // Error handling
  if (perPage < 10 || perPage > 50) {
    return res.status(400).json({
      error: `parameter invalid perPage: ${perPage} not valid. Accepted range is 10 - 50`
    })
  }

  const offset = (page - 1) * perPage

  const result = {}

  // States of filtered data
  const conditions = []
  const queryParams = []
  const paginator = []

  // Checking paginator queries
  if (page) {
    result.page = Number(page)
  }

  if (perPage) {
    result.per_page = Number(perPage)
  }

  // Checking all provided data and combine all of them for request
  if (type) {
    conditions.push('type = $1')
    queryParams.push(type)
  }

  if (perPage && !offset) {
    paginator.push(`LIMIT $${queryParams.length + 1}`)
    queryParams.push(perPage)
  }

  if (offset) {
    paginator.push(
      `LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`
    )
    queryParams.push(perPage, offset)
  }

  // Creating request
  const query = `SELECT * FROM pets${
    conditions.length > 0 ? ' WHERE ' + conditions.join(' AND ') : ''
  } ${paginator.length > 0 ? paginator : 'LIMIT 20'}`

  // Send request to database
  const pets = await db.query(query, queryParams)

  result.pets = pets.rows

  res.status(200).json(result)
})

// Create a pet
router.post('/', async (req, res, next) => {
  try {
    const { name, age, type, breed, has_microchip } = req.body

    // Error handler
    FieldsErrorHandler(req.body, [
      'name',
      'age',
      'type',
      'breed',
      'has_microchip'
    ])

    await db.query(
      'insert into pets (name, age, type, breed, has_microchip) values ($1, $2, $3, $4, $5)',
      [name, age, type, breed, has_microchip]
    )

    const createdPet = await db.query('select * from pets where name = $1', [
      name
    ])

    res.status(201).json({ pet: createdPet.rows[0] })
  } catch (error) {
    res.status(error.status).json({ error: error.message })
  }
})

// Get a pet by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    const pet = await getPetById(id)

    res.status(200).json({ pet: pet.rows[0] })
  } catch (error) {
    res.status(error.status).json({ error: error.message })
  }
})

// Update a pet
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, age, type, breed, has_microchip } = req.body

    await db.query(
      'update pets set name = $1, age = $2, type = $3, breed = $4, has_microchip = $5 where id = $6',
      [name, age, type, breed, has_microchip, id]
    )

    const updatedPet = await getPetById(id)

    res.status(201).json({ pet: updatedPet.rows[0] })
  } catch (error) {
    res.status(error.status).json({ error: error.message })
  }
})

// Delete a pet
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  const deletedPet = await db.query('select * from pets where id = $1', [id])

  await db.query('delete from pets where id = $1', [id])

  res.status(201).json({ pet: deletedPet.rows[0] })
})

module.exports = router
