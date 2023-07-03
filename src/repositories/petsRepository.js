const db = require('../../db')

const getAllPets = async (values, query) => {
  let str = 'SELECT * FROM pets'
  if (query === 'type') {
    str += ' WHERE type = $1'
  }
  const data = await db.query(str, values)
  const pets = data.rows
  return pets
}

const getPetByID = async (values) => {
  const str = 'SELECT * FROM pets WHERE id = $1'
  const data = await db.query(str, values)
  const pet = data.rows[0]
  return pet
}

const addNewPet = async (values) => {
  const str = 'INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *'
  const data = await db.query(str, values)
  const pet = data.rows[0]
  return pet
}

const updatePet = async (values) => {
  const str = 'UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, microchip = $5 where id = $6 RETURNING *'
  const data = await db.query(str, values)
  const pet = data.rows[0]
  return pet
}

const deletePet = async (values) => {
  const str = 'DELETE FROM pets WHERE id = $1 RETURNING *'
  const data = await db.query(str, values)
  const pet = data.rows[0]
  return pet
}

module.exports = {
  getAllPets,
  getPetByID,
  addNewPet,
  updatePet,
  deletePet
}