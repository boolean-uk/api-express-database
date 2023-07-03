const db = require('../../db')

const getAllBooks = async (values, query) => {
  let str = 'SELECT * FROM books'
  if (query === 'type') {
    str += ' WHERE type = $1';
  }
  if (query === 'topic') {
      str += ' WHERE topic = $1';
  }
  if (query === 'author') {
      str += ' WHERE author = $1';
  }
  const data = await db.query(str, values)
  const books = data.rows
  return books
}

const getBookByID = async (values) => {
  const str = 'SELECT * FROM books WHERE id = $1'
  const data = await db.query(str, values)
  const book = data.rows[0]
  return book
}

const getBookByTitle = async (values) => {
  const str = 'SELECT * FROM books WHERE title = $1'
  const data = await db.query(str, values)
  const book = data.rows[0]
  return book
}

const addNewBook = async (values) => {
  const str = 'INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'
  const data = await db.query(str, values)
  const book = data.rows[0]
  return book
}

const updateBook = async (values) => {
  const str = 'UPDATE books SET title = $1, type = $2, author = $3, topic = $4, "publicationDate" = $5, pages = $6 WHERE id = $7 RETURNING *'
  const data = await db.query(str, values)
  const book = data.rows[0]
  return book
}

const deleteBook = async (values) => {
  const str = 'DELETE FROM books WHERE id = $1 RETURNING *'
  const data = await db.query(str, values)
  const book = data.rows[0]
  return book
}

module.exports = {
  getAllBooks,
  getBookByID,
  addNewBook,
  getBookByTitle,
  updateBook,
  deleteBook
}