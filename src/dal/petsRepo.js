const dbConnection = require('../../db/dbConnection.js')

const getAllPets = async () => {
  const sqlQuery = 'select * from pets'
  const result = await dbConnection.query(sqlQuery)
  return result.rows
}

const createPet = async (pet) => {
  const {name, age, type, breed, has_microchip } = pet

  const sqlQuery = `INSERT INTO pets (name, age, type, breed, has_microchip) values ($1, $2, $3, $4, $5) returning *`

  const values = [name, age, type, breed, has_microchip]

  const result = await dbConnection.query(sqlQuery, values)
  return result.rows[0]
}

const getPetById = async (id) => {
  const sqlQuery = `select * from pets where id = $1`
  const result = await dbConnection.query(sqlQuery, [id])
  return result.rows[0]
}

const updatePet = async (id, pet) => {
  const {name, age, type, breed, has_microchip } = pet

  const sqlQuery = `UPDATE pets
  SET name = $1, age = $2, type = $3, breed = $4, has_microchip = $5 WHERE id = $6
  RETURNING *`


  const values = [name, age, type, breed, has_microchip, id]
  const result = await dbConnection.query(sqlQuery, values)
  return result.rows[0]
}

const deletePet = async (id) => {
const getPet = `select * from pets where id = $1`
  const deletedPet = await dbConnection.query(getPet, [id])

  const sqlQuery = 'delete from pets where id = $1'
  const result = await dbConnection.query(sqlQuery, [id])

  return deletedPet.rows[0]
}

module.exports = { getAllPets, createPet,getPetById, updatePet, deletePet }