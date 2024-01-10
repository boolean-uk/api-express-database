const booksRepository = require("../repositories/books");
const getAllBooks = async (req, res) => {
  const result = await booksRepository.getAllBooks(req.query);
  res.json({ books: result.rows });
};
const getBookBy = async (req, res) => {
  const { id } = req.params;
  const result = await booksRepository.getBookBy(req.params);

  if (result.rows.length === 0) {
    res.status(404).json({ error: `no book with id: ${id}` });
    return;
  }
  res.json({ book: result.rows[0] });
};
const deleteBook = async (req, res) => {
  const itemToDelete = await booksRepository.deleteBook(req.params);
  res.status(201).json({ book: itemToDelete.rows[0] });
};
const addBook = async (req, res) => {
  await booksRepository.addBook(req.body);
  const result = await booksRepository.getBookBy({ title: req.body.title });
  res.status(201).json({ book: result.rows[0] });
};
const editBook = async (req, res) => {
  await booksRepository.editBook(req.params, req.body);
  await booksRepository.editBook(req.params, req.body);
  const result = await booksRepository.getBookBy(req.params);
  res.status(201).json({ book: result.rows[0] });
};

module.exports = {
  getAllBooks,
  getBookBy,
  deleteBook,
  addBook,
  editBook,
};
