const {
  getAllBooks,
  getBookById,
  createBook,
} = require('../repositories/books');

const getAll = async (req, res) => {
  const books = await getAllBooks();
  res.json({ books: books });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const book = await getBookById(id);
  book ? res.json({ book: book }) : res.json({ book: null });
};

const create = async (req, res) => {
  console.log('create - controllers');
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const values = [title, type, author, topic, publicationDate, pages];

  const books = await createBook(values);
  res.status(201).json({ book: books });
};

module.exports = {
  getAll,
  getById,
  create,
};
