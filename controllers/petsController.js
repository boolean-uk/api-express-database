const db = require('../db/index')

const getAllPets = async (req, res) => {
  const { type } = req.query
  if (type) {
    const result = await db.query('SELECT * FROM pets WHERE type = $1', [type])
    res.json({ pets: result.rows })
    return
  }
  const result = await db.query('SELECT * FROM pets')
  res.json({ pets: result.rows })
}

const createPet = async (req, res) => {
  const { name, age, type, breed, microchip } = req.body
  const result = await db.query(
    'INSERT INTO pets (name, age, type , breed, microchip) VALUES ($1, $2, $3,$4,$5) RETURNING *',
    [name, age, type, breed, microchip]
  )
  res.status(201).json({ pets: result.rows[0] })
}

const getPetById = async (req, res) => {
  const id = req.params.id
  const result = await db.query('SELECT * FROM pets WHERE id = $1', [id])
  res.json({ pets: result.rows })
}

const updatePet = async (req, res) => {
  const { id } = req.params

  const { name, age, type, breed, microchip } = req.body
  const result = await db.query(
    'UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, microchip = $5 WHERE id = $6 RETURNING *',
    [name, age, type, breed, microchip, id]
  )
  res.status(201).json({ pets: result.rows[0] })
}

const deletePet = async (req, res) => {
  const { id } = req.params
  const result = await db.query(' DELETE FROM pets WHERE id = $1 RETURNING *', [
    id
  ])
  res.status(201).json({ pets: result.rows[0] })
}
module.exports = { getAllPets, createPet, getPetById, updatePet, deletePet }
