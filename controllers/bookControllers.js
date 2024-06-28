const booksRepo = require("../repo/booksRepo");

const getAllBooks = async (req, res) => {
  const result = await booksRepo.getAllBooks(req);

  res.status(200).send({ books: result.rows });
};

const createNewBook = async (req, res) => {
  const result = await booksRepo.createNewBook(req);

  res.status(201).send({ book: result.rows[0] });
};

const listBook = async (req, res) => {
  const result = await booksRepo.listBook(req);

  res.status(200).send({ book: result.rows[0] });
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const bookData = req.body;
  const updatedBook = await booksRepo.updateBook(id, bookData);

  res.status(201).send({ book: updatedBook });
};
const deleteBook = async (req, res) => {
  const { id } = req.params;
  const deletedBook = await booksRepo.deleteBook(id);
  res.status(201).send({ book: deletedBook });
};

module.exports = {
  createNewBook,
  getAllBooks,
  listBook,
  updateBook,
  deleteBook,
};
