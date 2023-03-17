const {
  getAllBooks,
  createNewBook,
  getBookById,
  updateBook,
  deleteBook,
} = require("../repositories/books");

const getAll = async (req, res) => {
  const books = await getAllBooks();

  res.json({ books: books });
};

const createBook = async (req, res, str, values) => {
  const book = await createNewBook(str, values);

  res.status(201).json({ book: book });
};

const getBook = async (req, res, str) => {
  const book = await getBookById(str);

  if (book === undefined) {
    return res.status(404).json({ error: `no book with id: ${req.params.id}` });
  } else {
    return res.json({ book: book });
  }
};

const update = async (req, res, str, values) => {
  const book = await updateBook(str, values);

  res.status(201).json({ book: book });
};

const deleted = async (req, res, str) => {
  const book = await deleteBook(str);

  res.status(201).json({ book: book });
};

module.exports = {
  getAll,
  createBook,
  getBook,
  update,
  deleted,
};
