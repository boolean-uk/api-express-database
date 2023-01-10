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
  const values = [
    req.body.title,
    req.body.type,
    req.body.author,
    req.body.topic,
    req.body.publicationDate,
    req.body.pages,
  ];
  console.log(values);
  const result = await createBook(values);
  res.json({ book: result.rows[0] });
};
module.exports = {
  getAll,
  getByID,
  create,
};
