const {
  getAllBooks,
  postNewBook,
  getBookById,
  updateBookById,
  deleteBookById,
} = require("../dal/booksRepo.js")
const getPaginationParams = require("../utils/pagination.js")

const getBooks = async (req, res) => {
  const { page, per_page } = getPaginationParams(req)
  const books = await getAllBooks(req)

  res.json({
    books,
    per_page,
    page
  }) 
}

const postBook = async (req, res) => {
  const book = await postNewBook(req)

  res.status(201).json({
    book,
  })
}

const getBook = async (req, res) => {
  const book = await getBookById(req)

  res.json({
    book,
  })
}

const updateBook = async (req, res) => {
  const book = await updateBookById(req)

  res.status(201).json({
    book,
  })
}

const deleteBook = async (req, res) => {
  const book = await deleteBookById(req)

  res.status(201).json({
    book,
  })
}

module.exports = {
  getBooks,
  postBook,
  getBook,
  updateBook,
  deleteBook,
}
