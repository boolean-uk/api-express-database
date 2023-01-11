const db = require('../db/index')
const getAll = async () => {
  const result = await db.query('SELECT * FROM books')
  return result.rows
}

const create = async (values) => {
  const result = await db.query(
    'INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    values
  )
  return result.rows[0]
}

const byId = async (id) => {
  const result = await db.query('SELECT * FROM books WHERE id = $1', [id])
  return result.rows[0]
}

const update = async (values) => {
  const result = await db.query(
    'UPDATE books SET title = $1, type = $2, author = $3, topic = $4, "publicationDate" = $5, pages = $6 WHERE id = $7 RETURNING *',
    values
  )
  return result.rows[0]
}

const bookRemove = async (id) => {
  const result = await db.query('DELETE FROM books WHERE id = $1 RETURNING *', [
    id
  ])
  return result.rows[0]
}

module.exports = {
  getAll,
  create,
  byId,
  update,
  bookRemove
}
