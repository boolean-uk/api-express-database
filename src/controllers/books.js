const {
  getAllBooks,
  getAllBooksByTypeOrTopic,
  getBookByID,
  createBook,
} = require("../repositories/books.js");

const getAll = async (req, res) => {
  const { topic, type } = req.query;
  if (topic || type) {
    const result = await getAllBooksByTypeOrTopic(type, topic);
    res.json({ books: result.rows });
  } else {
    const result = await getAllBooks();
    res.json({ books: result.rows });
  }
};
const getByID = async (req, res) => {
  const { id } = req.params;
  const result = await getBookByID(id);
  res.json({ book: result.rows[0] });
};
const create = async (req, res) => {
  const { db_table_column_names } = req.body;
  const result = await createBook(db_table_column_names);
  res.json({ book: result });
};
module.exports = {
  getAll,
  getByID,
  create,
};
