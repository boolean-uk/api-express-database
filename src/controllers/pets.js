const db = require('../../db')

const getAllPets = async (req, res) => {
  const { type } = req.query
  let result
  if (type) {
    result = await db.query('SELECT * FROM pets WHERE type = $1', [type])
  }
  result = await db.query('SELECT * FROM pets')
  res.status(200).json({ pets: result.rows })
}

const getPetByID = async (req, res) => {
  const { id } = req.params
  const result = await db.query('SELECT * FROM pets WHERE id = $1', [id])
  res.status(200).json({ pet: result.rows[0] })
}

const addNewPet = async (req, res) => {
  const { name, age, type, breed, microchip } = req.body
  const values = [name, age, type, breed, microchip]
  const result = await db.query('INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *', values)
  res.status(201).json({ pet: result.rows[0]})
}

const updatePet = async (req, res) => {
  const { id } = req.params
  const { name, age, type, breed, microchip } = req.body
  const values = [name, age, type, breed, microchip, id]
  const result = await db.query('UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, microchip = $5 where id = $6 RETURNING *', values)
  res.status(201).json({ pet: result.rows[0] })
}

const deletePet = async (req, res) => {
  const { id } = req.params
  const result = await db.query('DELETE FROM pets WHERE id = $1 RETURNING *', [id])
  res.status(201).json({ pet: result.rows[0] })
}

module.exports = {
  getAllPets,
  getPetByID,
  addNewPet,
  updatePet,
  deletePet
}