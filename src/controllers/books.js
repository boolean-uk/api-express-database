const {
  getAllBooks,
  getBookById,
  createBook,
} = require('../repositories/books');

const getAll = async (req, res) => {
  console.log('getAll - controllers');
  const books = await getAllBooks();
  res.json(books);
};

const getById = async (req, res) => {
  console.log('getById - controllers');
  const { id } = req.params;
  const book = await getBookById(id);
  res.json({ data: book });
};

const create = async (req, res) => {
  console.log('create - controllers');
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const values = [title, type, author, topic, publicationDate, pages];

  const books = await createBook(values);
  res.status(201).json(books);
};

module.exports = {
  getAll,
  getById,
  create,
};
