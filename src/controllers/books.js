const bookRepository = require('../repositories/books.js')
const permittedTypes = ['Fiction', 'Non-Fiction']

const getBooks = async (req, res) => {
  const author = req.query.author
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.perPage) || 20
  const offset = (page-1) * limit

  if (limit < 10 || limit > 50) {
    return res.status(400).json({error: `parameter invalid perPage: ${limit} not valid. Accepted range is 10 - 50`})
  }

  const values = [offset, limit]
  if (author) values.push(author)

  try {
    const books = await bookRepository.getBooks(values)
    res.json({books: books})
  } catch (e) {
    console.log(e)
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
    console.log(e)
    res.status(500).json({error: e.message})
  }
}

const createBook = async (req, res) => {
  try {
    const book = await bookRepository.createBook(Object.values(req.body))
    res.status(201).json({book: book})
  } catch (e) {
    res.status(500).json({error: e.message})
  }
}

const putBook = async (req, res) => {
  try {
    const currentBook = await bookRepository.findBookByTitle([req.body.title])
    if (currentBook) {
      return res.status(409).json({error: `A book with the title: ${req.body.title} already exists`})
    }

    const book = await bookRepository.updateBook([req.params.id, Object.values(req.body)].flat())
    if (!book) {
      res.status(404).json({error: `no book with id: ${req.params.id}`})
    } else {
      res.status(201).json({book: book})
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({error: e.message})
  }
}

const deleteBook = async (req, res) => {
  try {
    const book = await bookRepository.deleteBook([req.params.id])
    if (!book) {
      res.status(404).json({error: `no book with id: ${req.params.id}`})
    } else {
      res.status(201).json({book: book})
    }
  } catch (e) {
    res.status(500).json({error: e.message})
  }
}


module.exports = {
  getBooks,
  getBook,
  createBook,
  putBook,
  deleteBook
}
