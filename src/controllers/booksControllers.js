const { MissingFieldsError, NoDataError, InvalidParameterError } = require("../errors/errors");
const {
  fetchAllBooks,
  postBook,
  fetchBookById,
  updateBookById,
  deleteBookById,
  fetchBookByQuery
} = require("../dal/bookRepository");

async function getBooksController(req, res) {
  let books;
  const query = req.query

  if (query) {
    if (query.perPage < 10 || query.perPage > 50) {
        throw new InvalidParameterError(`parameter invalid perPage: ${query.perPage} not valid. Accepted range is 10 - 50`)
    }
    books = await fetchBookByQuery(query)
  } else {
    books = await fetchAllBooks();
  }
  
  res.status(200).json({ books,
    page: Number(query.page),
    per_page: Number(query.perPage)
   });
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

async function getBookByIdController(req, res) {
  targetBookId = Number(req.params.id);

  const book = await fetchBookById(targetBookId);
  if (!book) {
    throw new NoDataError(`no book with id: ${targetBookId}`);
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
  getBooksController,
  getBookByIdController,
  putBookByIdController,
  deleteBookByIdController,
};
