const MissingFieldError = require("../errors/MissingFieldError.js")
const NotFoundError = require("../errors/NotFoundError.js")
const dbConnection = require("../utils/dbConnection.js")

const getAllPets = async () => {
  const db = await dbConnection.connect()

  try {
    const sqlQuery = "select * from pets"
    const result = await db.query(sqlQuery)

    return result.rows
  } catch (error) {
    throw error
  } finally {
    db.release()
  }
}

const postNewPet = async (req) => {
  const db = await dbConnection.connect()
  const { name, age, type, breed, has_microchip } = req.body

  try {
    const sqlQuery =
      "insert into pets (name, age, type, breed, has_microchip) values ($1, $2, $3, $4, $5) returning *"
    const result = await db.query(sqlQuery, [
      name,
      age,
      type,
      breed,
      has_microchip,
    ])

    if (
      [name, age, type, breed, has_microchip].some((prop) => prop === undefined)
    ) {
      throw new MissingFieldError("Missing fields in the request body")
    }

    return result.rows[0]
  } catch (error) {
    throw error
  } finally {
    db.release()
  }
}

const getPetById = async (req) => {
  const db = await dbConnection.connect()
  const id = Number(req.params.id)

  try {
    const sqlQuery = "select * from pets where id = $1"
    const result = await db.query(sqlQuery, [id])

    if (result.rows.length === 0) {
      throw new NotFoundError(`no pet with id: ${id}`)
    }

    return result.rows[0]
  } catch (error) {
    throw error
  } finally {
    db.release()
  }
}

const updatePetById = async (req) => {
  const db = await dbConnection.connect()
  const { name, age, type, breed, has_microchip } = req.body
  const id = Number(req.params.id)

  try {
    const sqlQuery =
      "update pets set name = $1, age = $2, type = $3, breed = $4, has_microchip = $5 where id = $6 returning *"
    const result = await db.query(sqlQuery, [
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
  } catch (error) {
    throw error
  } finally {
    db.release()
  }
}

const deletePetById = async (req) => {
  const db = await dbConnection.connect()
  const id = Number(req.params.id)

  try {
    const sqlQuery = "delete from pets where id = $1 returning *"
    const result = await db.query(sqlQuery, [id])

    if (result.rows.length === 0) {
      throw new NotFoundError(`no pet with id: ${id}`)
    }

    return result.rows[0]
  } catch (error) {
    throw error
  } finally {
    db.release()
  }
}

module.exports = {
  getAllPets,
  postNewPet,
  getPetById,
  updatePetById,
  deletePetById,
}
