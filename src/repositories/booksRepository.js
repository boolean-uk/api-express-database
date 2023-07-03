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


module.exports = {
  getAllBooks,
  getBookByID
}