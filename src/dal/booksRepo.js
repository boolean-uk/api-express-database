const dbConnection = require('../../db/dbConnection.js')

const getAllBooks = async () => {
  const sqlQuery = 'select * from books'
  const result = await dbConnection.query(sqlQuery)
  return result.rows
}

const createBook = async (book) => {
  const {title, type, author, topic, publication_date, pages } = book

  const sqlQuery = `INSERT INTO books (title, type, author, topic, publication_date, pages) values ($1, $2, $3, $4, $5, $6) returning *`

  const values = [title, type, author, topic, publication_date, pages]

  const result = await dbConnection.query(sqlQuery, values)
  return result.rows[0]
}

const getBookById = async (id) => {
  const sqlQuery = `select * from books where id = $1`
  const result = await dbConnection.query(sqlQuery, [id])
  return result.rows[0]
}

const updateBook = async (id, book) => {
  const {title, type, author, topic, publication_date, pages } = book

  const sqlQuery = `UPDATE books
  SET title = $1, type = $2, author = $3, topic = $4, publication_date = $5, pages = $6
  WHERE id = $7
  RETURNING *`


  const values = [title, type, author, topic, publication_date, pages, id]
  const result = await dbConnection.query(sqlQuery, values)
  return result.rows[0]
}

const deleteBook = async (id) => {
const getBook = `select * from books where id = $1`
  const deletedBook = await dbConnection.query(getBook, [id])

  const sqlQuery = 'delete from books where id = $1'
  const result = await dbConnection.query(sqlQuery, [id])

  return deletedBook.rows[0]
}

module.exports = { getAllBooks, createBook, getBookById, updateBook, deleteBook }