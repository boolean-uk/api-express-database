const booksRepository = require("../repositories/books.repository");

const getAllBooks = async (req, res) => {
  try {
    const results = await booksRepository.getAllBooks(req.query);
    console.log(req.query)
    return res.json({ books: results.books, perPage: results.per_page, page: results.page });
  } catch {
    res.status(500).json({ error: "an error occurred" });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await booksRepository.getBookById(req.params.id);
    return res.json({ book });
  } catch (error) {
    console.error(error)
    console.log(error)
    res.status(404).json({ error });
  }
};

const addBook = async (req, res) => {
  const book = {
    title: req.body.title,
    type: req.body.type,
    author: req.body.author,
    topic: req.body.topic,
    publicationDate: new Date(req.body.publicationDate),
    pages: req.body.pages,
  };

  try {
    const newBook = await booksRepository.addBook(book);
    return res.status(201).json({ book: newBook });
  } catch {
    res.status(500).json({ error: "an error occurred" });
  }
};

const updateBook = async (req, res) => {
  const book = {
    title: req.body.title,
    type: req.body.type,
    author: req.body.author,
    topic: req.body.topic,
    publicationDate: new Date(req.body.publicationDate),
    pages: req.body.pages,
  };

  try {
    const newBook = await booksRepository.updateBook(req.params.id, book);
    return res.status(201).json({ book: newBook });
  } catch {
    res.status(500).json({ error: "an error occurred" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await booksRepository.deleteBook(req.params.id);
    return res.status(201).json({ book });
  } catch {
    res.status(500).json({ error: "an error occurred" });
  }
};

module.exports = {
  getAllBooks,
  addBook,
  getBookById,
  updateBook,
  deleteBook,
};
