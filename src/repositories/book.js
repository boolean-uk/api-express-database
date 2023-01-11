const { as } = require("pg-promise");
const db = require("../../db");

const getAllBooks = async () => {
  const result = await db.query("SELECT * FROM books");

  return result.rows;
};

const getBookById = async (id) => {
  const result = await db.query(`SELECT * FROM books WHERE id = ${id}`);
  return result.rows;
};

const createBook = async (values) => {
  const result = await db.query(
    'INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    values
  );

  return result.rows[0];
};

const updateBook = async (id, values) => {
  const result = await db.query(
    'UPDATE books SET title = $2, type = $3, author = $4, topic = $5, "publicationDate" =$6, pages=$7 WHERE id = $1 RETURNING *',
    [id, ...values]
  );

  return result.rows[0];
};
module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
};
