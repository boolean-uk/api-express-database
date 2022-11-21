const booksRepository = require("../repositories/books.repository");

const getAllBooks = async (req, res) => {
  try {
    const books = await booksRepository.getAllBooks();
    return res.json({ books });
  } catch {
    res.status(500);
    res.json({ error: "an error occurred" });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await booksRepository.getBookById(req.params.id);
    return res.json({ book });
  } catch {
    res.status(500);
    res.json({ error: "an error occurred" });
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
    return res.json({ book: newBook });
  } catch {
    res.status(500);
    res.json({ error: "an error occurred" });
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
    return res.json({ newBook });
  } catch {
    res.status(500);
    res.json({ error: "an error occurred" });
  }
};

const deleteBook = async (req, res) => {
  try {
    await booksRepository.deleteBook(req.params.id);
    res.status(201).json({ message: "Deleted" });
  } catch {
    res.status(500);
    res.json({ error: "an error occurred" });
  }
};

module.exports = {
  getAllBooks,
  addBook,
  getBookById,
  updateBook,
  deleteBook
};
