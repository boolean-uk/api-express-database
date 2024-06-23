const MissingFieldError = require("../errors/MissingFieldError.js")
const NotFoundError = require("../errors/NotFoundError.js")
const dbConnection = require("../utils/dbConnection.js")

const getAllPets = async (req) => {
  const db = await dbConnection.connect()
  let page = 1
  let perPage = 20

  try {
    let sqlQuery = "select * from pets"
    let result = await db.query(sqlQuery)

    if (req.query.page && req.query.perPage) {
      page = Number(req.query.page)
      perPage = Number(req.query.perPage)
      
      if (perPage > 50 || perPage < 10 || page < 1) {
        throw new MissingFieldError(`parameter invalid perPage: ${perPage} not valid. Accepted range is 10 - 50`)
      }

      const calculateOffset = () => {
        if (page === 1) {
          return 0
        } else if (page === 2) {
          return perPage
        } else {
          return perPage * page
        }
      }

      sqlQuery = "select * from pets limit $1 offset $2"
      result = await db.query(sqlQuery, [perPage, calculateOffset()])

      if (result.rows.length === 0) {
        throw new MissingFieldError("The number of pets per page exceeds the total")
      }
      
      return {
        ...result.rows,
        perPage,
        page
      }
    }

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
  const props = { name, age, type, breed, has_microchip }
  const undefinedProps = []

  try {
    Object.keys(props).forEach(prop => {
      if (props[prop] === undefined) {
        undefinedProps.push(prop)
      }
    })

    if (undefinedProps.length > 0) {
      throw new MissingFieldError(`missing fields: ${undefinedProps.join(', ')}`)
    }

    const sqlQuery =
      "insert into pets (name, age, type, breed, has_microchip) values ($1, $2, $3, $4, $5) returning *"
    const result = await db.query(sqlQuery, [
      name,
      age,
      type,
      breed,
      has_microchip,
    ])

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
