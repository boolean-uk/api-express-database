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
  const book = await booksRepository.addNewBook(values)
  res.status(201).json({ book })
}

const updateBook = async (req, res) => {
  const { id } = req.params
  const { title, type, author, topic, publicationDate, pages } = req.body
  const values = [title, type, author, topic, publicationDate, pages, id]
  const bookIdFound = await booksRepository.getBookByID([id])
  const bookTitleFound = await booksRepository.getBookByTitle([title])

  if (bookTitleFound) {
    res.status(409).json({ error: `A book with the title: ${title} already exists`})
  }
  if (!bookIdFound) {
    res.status(404).json({ error: `no book with id: ${id}`})
  }
  const book = await booksRepository.updateBook(values)
  res.status(201).json({ book })

}

const deleteBook = async (req, res) => {
  const { id } = req.params
  const values = [id]
  const book = await booksRepository.deleteBook(values)
  res.status(201).json({ book })
}

module.exports = {
  getAllBooks,
  getBookByID,
  addNewBook,
  updateBook,
  deleteBook
}