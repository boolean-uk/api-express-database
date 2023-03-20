const booksRepo = require("../repositories/books.js");
const db = require("../../db");

const getBooks = async (req, res) => {
  const queries = req.query;

  if (queries.perPage === undefined) queries.perPage = 20;
  if (queries.page === undefined) queries.page = 1;
  queries.offset = queries.perPage * (queries.page - 1);

  const values = [Number(queries.perPage), queries.offset];

  if (queries.author !== undefined) {
    values.push(queries.author);
  }

  if (queries.perPage < 10 || queries.perPage > 50) {
    res.status(400).json({
      error: `parameter invalid perPage: ${queries.perPage} not valid. Accepted range is 10 - 50`,
    });
    return;
  }

  const data = await booksRepo.getBooks(values);
  const resdata = { books: data.rows };
  if (queries.perPage || queries.page) {
    resdata.per_page = Number(queries.perPage);
    resdata.page = Number(queries.page);
  }
  return res.json(resdata);
};

const postBook = async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const values = [title, type, author, topic, publicationDate, pages];
  const data = await booksRepo.postBook(values);
  return res.status(201).json({ book: data.rows[0] });
};

const getBookById = async (req, res) => {
  const id = Number(req.params.id);
  const values = [id];
  const data = await booksRepo.getBookById(values);
  if (data.rowCount === 0) {
    res.status(404).json({ error: `no book with id: ${req.params.id}` });
    return;
  }
  return res.json({ book: data.rows[0] });
};

const updateBookById = async (req, res) => {
  const checkStr = "SELECT * FROM books WHERE title = $1";
  const checkValues = [req.body.title];
  const check = await db.query(checkStr, checkValues);
  if (check.rows != 0) {
    res.status(409).json({
      error: `A book with the title: ${req.body.title} already exists`,
    });
    return;
  }
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const id = Number(req.params.id);
  const values = [id, title, type, author, topic, publicationDate, pages];
  const data = await booksRepo.updateBookById(values);
  if (data.rowCount === 0) {
    res.status(404).json({ error: `no book with id: ${req.params.id}` });
    return;
  }
  return res.status(201).json({ book: data.rows[0] });
};

const deleteBookById = async (req, res) => {
  const id = Number(req.params.id);
  const values = [id];
  const data = await booksRepo.deleteBookById(values);
  if (data.rowCount === 0) {
    res.status(404).json({ error: `no book with id: ${req.params.id}` });
    return;
  }
  res.status(201).json({ book: data.rows[0] });
};

module.exports = {
  getBooks,
  postBook,
  getBookById,
  updateBookById,
  deleteBookById,
};
