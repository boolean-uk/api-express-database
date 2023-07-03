const db = require('../../db')

const booksRepository = require('../repositories/booksRepository')

const getAllBooks = async (req, res) => {
  const { type, topic, author } = req.query
  let values = []
  let query = ''

  if (type) {
    query = 'type'
    values = [type]
  }
  if (topic) {
    query = 'type'
    values = [topic]
  }
  if (author) {
    query = 'author'
    values = [author]
  }
  const books = await booksRepository.getAllBooks(values, query)
  res.json({ books })
}

const getBookByID = async (req, res) => {
  const { id } = req.params
  const values = [id]
  const book = await booksRepository.getBookByID(values)
  if (!book) {
    res.status(404).json({ error: `no book with id: ${id}` })
  } else {
    res.status(200).json({ book })
  }
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

  const idCheck = await db.query('SELECT * FROM books WHERE id = $1', [id])
  const idResult = titleCheck.rows[0]

  if (idResult) {
    const titleCheck = await db.query('SELECT * FROM books WHERE title = $1', [title])
    const titleResult = titleCheck.rows[0]
    if (titleResult) {
      res.status(409).json(`A book with the title: ${title} already exists`)
    } else {
      const result = await db.query('UPDATE books SET title = $1, type = $2, author = $3, topic = $4, "publicationDate" = $5, pages = $6 WHERE id = $7 RETURNING *',
      values)
      res.status(201).json({ book: result.rows[0] })
    }
  } else {
    res.status(404).json(`no book with id: ${id}`)
  }
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