const db = require("../../db");
const bookRepository = require('../repositories/books.js')
const permittedTypes = ['Fiction', 'Non-Fiction']

const getBooks = async (req, res) => {
  const topic = req.query.topic
  const type = req.query.type

  if (type && !permittedTypes.includes(type)) {
    return res.status(400).json({error: `type: ${type} not valid. Accepted types are: ${permittedTypes}`})
  }

  try {
    const books = await bookRepository.getBooks([type, topic])
    res.json({books: books})
  } catch (e) {
    res.status(500).json({error: e.message})
  }
}

const getBook = async (req, res) => {
  try {
    const book = await bookRepository.getBook([req.params.id])
    if (!book) {
      res.status(404).json({error: `no book with id: ${req.params.id}`})
    } else {
      res.json({book: book})
    }
  } catch (e) {
    res.status(500).json({error: e.message})
  }
}

const createBook = async (req, res) => {
  try {
    const book = await bookRepository.createBook(Object.values(req.body))
    res.json({book: book})
  } catch (e) {
    res.status(500).json({error: e.message})
  }
}

module.exports = {
  getBooks: getBooks,
  getBook: getBook,
  createBook: createBook
}
