const db = require('../db/index')

const {
  getAll,
  create,
  byId,
  update,
  bookRemove
} = require('../queries/bookQueries')

const getAllBooks = async (req, res) => {
  const { type, topic } = req.query
  if (type && topic) {
    const result = await db.query(
      'SELECT * FROM books WHERE type = $1 AND topic = $2',
      [type, topic]
    )
    res.json({ books: result.rows })
    return
  }
  if (type) {
    const result = await db.query('SELECT * FROM books WHERE type = $1', [type])
    res.json({ books: result.rows })
    return
  }
  if (topic) {
    const result = await db.query('SELECT * FROM books WHERE topic = $1', [
      topic
    ])
    res.json({ books: result.rows })
    return
  }

  const result = await getAll()

  res.json({ books: result })
}

const createBook = async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body
  const values = [title, type, author, topic, publicationDate, pages]
  const result = await create(values)
  res.status(201).json({ book: result })
}

const getBookById = async (req, res) => {
  const { id } = req.params
  const result = await byId(id)
  res.json({ book: result })
}

const updateBook = async (req, res) => {
  const { id } = req.params
  const { title, type, author, topic, publicationDate, pages } = req.body
  const values = [title, type, author, topic, publicationDate, pages, id]
  const result = await update(values)

  res.status(201).json({ book: result })
}

const deleteBook = async (req, res) => {
  const { id } = req.params
  const result = await bookRemove(id)
  res.status(201).json({ book: result })
}

module.exports = {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook
}
