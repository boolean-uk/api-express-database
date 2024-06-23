const { MissingFieldsError, NoDataError } = require("../errors/errors");
const {
  fetchBooks,
  postBook,
  fetchBookById,
  updateBookById,
  deleteBookById
} = require("../dal/bookRepository");

async function getAllBooksController(req, res) {
  const books = await fetchBooks(req.query);
  res.status(200).json({ books });
}

async function addBookController(req, res, next) {
  const book = req.body;
  const requiredProperties = [
    "title",
    "type",
    "author",
    "topic",
    "publication_date",
    "pages",
  ];

  try {
    const allFieldsExist = requiredProperties.every(
      (property) => book[property]
    );
    if (!allFieldsExist) {
      throw new MissingFieldsError(
        "Books require a title, type, author, topic, publication year, and number of pages"
      );
    }
    postBook(book);
    res.status(201).json({ book });
  } catch (e) {
    console.log(e);
    next(e);
  }
}

async function getBookByIdController(req, res, next) {
  targetBookId = Number(req.params.id);
  try {
    const book = await fetchBookById(targetBookId);
    if (book.length === 0) {
      throw new NoDataError("A book with the provided ID does not exist");
    }
    res.status(200).json({ book });
  } catch (e) {
    console.log(e);
    next(e);
  }
}

async function putBookByIdController(req, res, next) {
  const targetBookId = Number(req.params.id);
  const newParams = req.body;

  try {
    const book = await fetchBookById(targetBookId);
    if (book.length === 0) {
      throw new NoDataError("A book with the provided ID does not exist");
    }
    const updatedBook = await updateBookById(targetBookId, newParams);
    res.status(201).json({ book: updatedBook });
  } catch (e) {
    console.log(e);
    next(e);
  }
}

async function deleteBookByIdController(req, res, next) {
  const targetBookId = Number(req.params.id);

  try {
    const book = await fetchBookById(targetBookId);
    if (book.length === 0) {
      throw new NoDataError("A book with the provided ID does not exist");
    }
    const deletedBook = await deleteBookById(targetBookId)
    res.status(201).json({ book: deletedBook})
  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = {
  addBookController,
  getAllBooksController,
  getBookByIdController,
  putBookByIdController,
  deleteBookByIdController
};
