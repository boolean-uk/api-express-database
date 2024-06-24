const { MissingFieldsError, NoDataError } = require("../errors/errors");
const {
  fetchBooks,
  postBook,
  fetchBookById,
  updateBookById,
  deleteBookById,
} = require("../dal/bookRepository");

async function getAllBooksController(req, res) {
  const books = await fetchBooks(req.query);
  res.status(200).json({ books });
}

async function addBookController(req, res) {
  const newBook = req.body;
  const requiredProperties = [
    "title",
    "type",
    "author",
    "topic",
    "publication_date",
    "pages",
  ];
  const allFieldsExist = requiredProperties.every(
    (property) => newBook[property]
  );
  if (!allFieldsExist) {
    throw new MissingFieldsError(
      "Books require a title, type, author, topic, publication year, and number of pages"
    );
  }
  const book = await postBook(newBook);
  res.status(201).json({ book });
}

async function getBookByIdController(req, res, next) {
  targetBookId = Number(req.params.id);

  const book = await fetchBookById(targetBookId);
  if (book.length === 0) {
    throw new NoDataError("A book with the provided ID does not exist");
  }
  res.status(200).json({ book });
}

async function putBookByIdController(req, res, next) {
  const targetBookId = Number(req.params.id);
  const newParams = req.body;

    const book = await fetchBookById(targetBookId);
    if (book.length === 0) {
      throw new NoDataError("A book with the provided ID does not exist");
    }

    const updatedBook = await updateBookById(targetBookId, newParams);
    res.status(201).json({ book: updatedBook });
}

async function deleteBookByIdController(req, res, next) {
  const targetBookId = Number(req.params.id);

    const book = await fetchBookById(targetBookId);
    if (book.length === 0) {
      throw new NoDataError("A book with the provided ID does not exist");
    }
    const deletedBook = await deleteBookById(targetBookId);
    res.status(201).json({ book: deletedBook });
  
}

module.exports = {
  addBookController,
  getAllBooksController,
  getBookByIdController,
  putBookByIdController,
  deleteBookByIdController,
};
