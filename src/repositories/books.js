const db = require("../../db");

const getBooks = async (values) => {
  let sqlString = 'SELECT * FROM "books"'
  const [type, topic] = values
  // as an example of interpolation
  if (type && topic) {
    sqlString += ` WHERE type = '${type}' AND topic = '${topic}';`
  } else if (type) {
    sqlString += ` WHERE type = '${type}';`
  } else if (topic) {
    sqlString += ` WHERE topic = '${topic}';`
  }
  const result = await db.query(sqlString)
  return result.rows
}

const getBook = async (values) => {
  const sqlString = `SELECT * FROM "books" WHERE id = $1;`
  const result = await db.query(sqlString, values)
  return result.rows[0]
}

const createBook = async (values) => {
  const sqlString = `INSERT INTO "books" (title, type, author, topic, publicationDate, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`
  const result = await db.query(sqlString, values)
  return result.rows[0]
}

module.exports = {
  getBooks: getBooks,
  getBook: getBook,
  createBook: createBook
}
