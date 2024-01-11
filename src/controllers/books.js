const booksRepository = require("../repositories/books");

const getAllBooks = async (req, res) => {
  const perPage = req.query.perPage;
  const page = req.query.page;
  const author = req.query.author;
  if ((perPage && perPage > 50) || perPage < 10) {
    res.status(400).json({
      error: `parameter invalid perPage: ${perPage} not valid. Accepted range is 10 - 50`,
    });
    return;
  }
  const result = await booksRepository.getAllBooks(author, page, perPage);
  res.json(result);
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
  const selectItemToDelete = await booksRepository.getBookBy(req.params);
  const itemToDelete = selectItemToDelete.rows[0];
  const { id } = req.params;
  if (!itemToDelete) {
    res.status(404).json({ error: `no book with id: ${id}` });
    return;
  }
  await booksRepository.deleteBook(id);
  res.status(201).json({ book: itemToDelete });
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
