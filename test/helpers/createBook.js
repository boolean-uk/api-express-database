const client = require("../../db");

const createBook = async (values) => {
  const sqlString = `INSERT INTO "books" (title, type, author, topic, "publicationDate", pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`

  const result = await client.query(sqlString, values)

  return result.rows[0]
}

module.exports = createBook
