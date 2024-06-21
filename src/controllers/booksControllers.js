const {
  getAllBooks,
  postNewBook,
  getBookById,
  updateBookById,
  deleteBookById,
} = require("../dal/booksRepo.js")

const getBooks = async (req, res) => {
  const books = await getAllBooks()

  res.json({
    books,
  })
}

const postBook = async (req, res, next) => {
  try {
    const book = await postNewBook(req)

    res.status(201).json({
      book,
    })
  } catch (error) {
    next(error)
  }
}

const getBook = async (req, res, next) => {
  try {
    const book = await getBookById(req)

    res.json({
      book,
    })
  } catch (error) {
    next(error)
  }
}

const updateBook = async (req, res, next) => {
  try {
    const book = await updateBookById(req)

    res.status(201).json({
      book,
    })
  } catch (error) {
    next(error)
  }
}

const deleteBook = async (req, res, next) => {
  try {
    const book = await deleteBookById(req)

    res.status(201).json({
      book,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getBooks,
  postBook,
  getBook,
  updateBook,
  deleteBook,
}
