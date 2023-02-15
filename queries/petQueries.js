const db = require('../db/index')

const getAll = async (type) => {
  if (type) {
    const result = await db.query('SELECT * FROM pets WHERE type = $1', [type])
    return result.rows
  }
  const result = await db.query('SELECT * FROM pets')
  return result.rows
}

const create = async (values) => {
  const result = await db.query(
    'INSERT INTO pets (name, age, type , breed, microchip) VALUES ($1, $2, $3,$4,$5) RETURNING *',
    values
  )
  return result.rows[0]
}

const byId = async (id) => {
  const result = await db.query('SELECT * FROM pets WHERE id = $1', [id])
  return result.rows[0]
}

const update = async (values) => {
  const result = await db.query(
    'UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, microchip = $5 WHERE id = $6 RETURNING *',
    values
  )

  return result.rows[0]
}

const petRemove = async (id) => {
  const result = await db.query(' DELETE FROM pets WHERE id = $1 RETURNING *', [
    id
  ])
  return result.rows[0]
}

module.exports = { getAll, create, byId, update, petRemove }
