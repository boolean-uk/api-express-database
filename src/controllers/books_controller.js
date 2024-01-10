const booksRepository = require("../repositories/books_repository.js");

const getAllBooks = async (req, res) => {
  const { title, author } = req.query;
  try {
    const books = await booksRepository.getAllBooks(title, author);
    res.json({ books });
  } catch (error) {
    res.status(500).json({ error: "An error occured" });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await booksRepository.getBookById(id);
    res.json({ book });
  } catch (error) {}
};

const createBook = async (req, res) => {
  const { title, type, author, topic, publication_date, pages } = req.body;

  try {
    const newBook = await booksRepository.createBook(
      title,
      type,
      author,
      topic,
      publication_date,
      pages
    );
    res.status(201).json({ book: newBook });
  } catch (error) {
    res.status(500).json({ error: "An error occured" });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, type, author, topic, publication_date, pages } = req.body;

  try {
    const updatedBook = await booksRepository.updateBook(
      id,
      title,
      type,
      author,
      topic,
      publication_date,
      pages
    );
    res.status(201).json({ book: updatedBook });
  } catch (error) {
    res.status(500).json({ error: "An error occured" });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await booksRepository.deleteBook(id);
    res.status(201).json({ book: deletedBook });
  } catch (error) {
    res.status(500).json({ error: "An error occured" });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
