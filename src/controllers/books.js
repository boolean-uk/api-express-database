const {
  createBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
} = require("../repositories/books");

const getAll = async (req, res) => {
  const type = req.query.type;
  const topic = req.query.topic;
  const books = await getAllBooks(type, topic);
  res.json({ books });
};

const create = async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const values = [title, type, author, topic, publicationDate, pages];

  try {
    const book = await createBook(values);

    if (!book) {
      res.status(400).json({
        error: "Failed to create book with the values provided.",
        body: req.body,
      });
    } else {
      res.status(201).json({ book });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await getBook(id);
    if (!book) {
      res.status(404).json({ error: `no book with id: ${id}` });
    } else {
      res.status(200).json({ book });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBookById = async (req, res) => {
  const { id } = req.params;
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const values = [title, type, author, topic, publicationDate, pages];

  try {
    const book = await updateBook(values, id);

    if (!book) {
      res.status(400).json({
        error: "Failed to create book with the values provided.",
        body: req.body,
      });
    } else {
      res.status(201).json({ book });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBookById = async (req, res) => {
  const { id } = req.params;
  const book = await deleteBook(id);
  res.status(201).json({ book });
};

module.exports = {
  create,
  getAll,
  getBookById,
  updateBookById,
  deleteBookById,
};
