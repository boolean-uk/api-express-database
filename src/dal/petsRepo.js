const MissingFieldError = require("../errors/MissingFieldError.js")
const NotFoundError = require("../errors/NotFoundError.js")
const dbConnection = require("../utils/dbConnection.js")
const getPaginationParams = require("../utils/pagination.js")

const getAllPets = async (req) => {
  const { page, per_page } = getPaginationParams(req)

  let sqlQuery = "select * from pets"
  let result = await dbConnection.query(sqlQuery)

  const calculateOffset = () => (page - 1) * per_page

  sqlQuery = "select * from pets limit $1 offset $2"
  result = await dbConnection.query(sqlQuery, [per_page, calculateOffset()])

  return result.rows
}

const postNewPet = async (req) => {
  const { name, age, type, breed, has_microchip } = req.body
  const undefinedProps = ['name', 'age', 'type', 'breed', 'has_microchip'].filter(
    (prop) => req.body[prop] === undefined
  )

  if (undefinedProps.length > 0) {
    throw new MissingFieldError(`missing fields: ${undefinedProps.join(", ")}`)
  }

  const sqlQuery =
    "insert into pets (name, age, type, breed, has_microchip) values ($1, $2, $3, $4, $5) returning *"
  const result = await dbConnection.query(sqlQuery, [
    name,
    age,
    type,
    breed,
    has_microchip,
  ])

  return result.rows[0]
}

const getPetById = async (req) => {
  const id = Number(req.params.id)

  const sqlQuery = "select * from pets where id = $1"
  const result = await dbConnection.query(sqlQuery, [id])

  if (result.rows.length === 0) {
    throw new NotFoundError(`no pet with id: ${id}`)
  }

  return result.rows[0]
}

const updatePetById = async (req) => {
  const { name, age, type, breed, has_microchip } = req.body
  const id = Number(req.params.id)

  const sqlQuery =
    "update pets set name = $1, age = $2, type = $3, breed = $4, has_microchip = $5 where id = $6 returning *"
  const result = await dbConnection.query(sqlQuery, [
    name,
    age,
    type,
    breed,
    has_microchip,
    id,
  ])

  if (result.rows.length === 0) {
    throw new NotFoundError(`no pet with id: ${id}`)
  }

  return result.rows[0]
}

const deletePetById = async (req) => {
  const id = Number(req.params.id)

  const sqlQuery = "delete from pets where id = $1 returning *"
  const result = await dbConnection.query(sqlQuery, [id])

  if (result.rows.length === 0) {
    throw new NotFoundError(`no pet with id: ${id}`)
  }

  return result.rows[0]
}

module.exports = {
  getAllPets,
  postNewPet,
  getPetById,
  updatePetById,
  deletePetById,
}
