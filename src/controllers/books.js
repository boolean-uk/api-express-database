const { getAllBooks, getBookById } = require('../repositories/books');

const getAll = async (req, res) => {
  const books = await getAllBooks();
  res.json({ data: books });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const book = await getBookById(id);
  res.json({ data: book });
};

const create = async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;
  res.json();
};

module.exports = {
  getAll,
  getById,
  create,
};
