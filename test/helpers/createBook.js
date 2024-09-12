const client = require("../../db");

const createBook = async (values) => {
  const sqlString = `INSERT INTO "books" (title, type, author, topic, publication_date, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`
  const query = {
    text: sqlString,
    values: Object.values(values)
  }
  const result = await client.query(query)

  return result.rows[0]
}

module.exports = createBook
