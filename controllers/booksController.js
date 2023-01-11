const db = require('../db/index')

const {
  getAll,
  create,
  byId,
  update,
  bookRemove
} = require('../queries/bookQueries')

const getAllBooks = async (req, res) => {
  const { type, topic, author } = req.query

  const result = await getAll(type, topic, author)

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
  try {
    const result = await byId(id)
    if (!result) {
      res.status(404).json({
        error: 'A book with the provided ID does not exist'
      })
    } else {
      res.json({ book: result })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateBook = async (req, res) => {
  const { id } = req.params
  const { title, type, author, topic, publicationDate, pages } = req.body
  const values = [title, type, author, topic, publicationDate, pages, id]
  try {
    const result = await update(values)
    if (!result) {
      res.status(404).json({
        error: 'A book with the provided ID does not exist'
      })
    } else {
      res.status(201).json({ book: result })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteBook = async (req, res) => {
  const { id } = req.params

  try {
    const result = await bookRemove(id)
    if (!result) {
      res.status(404).json({
        error:
          'A book with the provided ID does not exist and connot be deleted! You obviously cant delete something that doesnt exist, bruh !'
      })
    } else {
      res.status(201).json({ book: result })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook
}
