const dbConnection = require('../../db/dbConnection.js')

const getAllBooks = async () => {
  const sqlQuery = 'select * from books'
  const result = await dbConnection.query(sqlQuery)
  return result.rows
}

const createBook = async (book) => {
  const {title, type, author, topic, publication_date, pages } = book

  const sqlQuery = `INSERT INTO books(title, type, author, topic, publication_date, pages) values ($1, $2, $3, $4, $5, $6) returning *`

  const values = [title, type, author, topic, publication_date, pages]

  const result = await dbConnection.query(sqlQuery, values)
  console.log(result)
  return result.rows[0]
}




module.exports = { getAllBooks, createBook }