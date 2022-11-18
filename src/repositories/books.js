const client = require("../../db");

const getBooks = async (values) => {
  let sqlString = 'SELECT * FROM "books"'
  let [offset, limit, author] = values
  // as an example of interpolation
  if (author) {
    sqlString += ` WHERE author = $3 OFFSET $1 LIMIT $2;`
  } else {
    sqlString += ` OFFSET $1 LIMIT $2;`
  }

  const result = await client.query(sqlString, values)

  return result.rows
}

const getBook = async (values) => {
  const sqlString = `SELECT * FROM "books" WHERE id = $1;`
  const result = await client.query(sqlString, values)
  return result.rows[0]
}

const createBook = async (values) => {
  const sqlString = `INSERT INTO "books" (title, type, author, topic, "publicationDate", pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`

  const result = await client.query(sqlString, values)

  return result.rows[0]
}

const updateBook = async (values) => {
  const sqlString = `UPDATE "books" SET title = $2, type = $3, author = $4, topic = $5, "publicationDate" = $6, pages = $7 WHERE id = $1 RETURNING *;`

  const result = await client.query(sqlString, values)

  return result.rows[0]
}

const deleteBook = async (values) => {
  const sqlString = `DELETE FROM "books" WHERE id = $1 RETURNING *;`

  const result = await client.query(sqlString, values)

  return result.rows[0]
}

const findBookByTitle = async (values) => {
  const sqlString = `SELECT * FROM "books" WHERE title = $1;`
  const result = await client.query(sqlString, values)
  return result.rows[0]
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  findBookByTitle
}
