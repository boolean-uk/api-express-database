const db = require('../../db')

const getAllBooks = async (req, res) => {
  const { type, topic, author } = req.query
  let result
  if (type && topic) {
    result = await db.query('SELECT * FROM books WHERE type = $1 AND topic = $2', [type, topic]);
  } else if (type) {
    result = await db.query('SELECT * FROM books WHERE type = $1', [type]);
  } else if (topic) {
    result = await db.query('SELECT * FROM books WHERE topic = $1', [topic]);
  } else if (author) {
    result = await db.query('SELECT * FROM books WHERE author = $1', [author]);
  } else {
    result = await db.query('SELECT * FROM books');
  }
  res.status(200).json({ books: result.rows });
}

const getBookByID = async (req, res) => {
  const { id } = req.params
  const result = await db.query('SELECT * FROM books WHERE id = $1', [id])
  res.status(200).json({ book: result.rows[0] })
}

const addNewBook = async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body
  const values = [title, type, author, topic, publicationDate, pages]
  const result = await db.query('INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', values)
  res.status(201).json({ book: result.rows[0] })
}

const updateBook = async (req, res) => {
  const { id } = req.params
  const { title, type, author, topic, publicationDate, pages } = req.body
  const values = [title, type, author, topic, publicationDate, pages, id]
  const result = await db.query('UPDATE books SET title = $1, type = $2, author = $3, topic = $4, "publicationDate" = $5, pages = $6 WHERE id = $7 RETURNING *',
  values)
  res.status(201).json({ book: result.rows[0] })
}

const deleteBook = async (req, res) => {
  const { id } = req.params
  const result = await db.query('DELETE FROM books WHERE id = $1 RETURNING *', [id])
  res.status(201).json({ book: result.rows[0] })
}

module.exports = {
  getAllBooks,
  getBookByID,
  addNewBook,
  updateBook,
  deleteBook
}