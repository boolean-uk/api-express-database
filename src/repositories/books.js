const db = require("../../db");

const getAllBooks = async () => {
  const books = await db.query("SELECT * FROM books");
  return books.rows;
};

const createBook = async (values) => {
  const book = await db.query(
    `INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    values
  );
  return book.rows[0];
};

const getBook = async (id) => {
  const book = await db.query(`SELECT * FROM books WHERE id = ${id} `);
  return book.rows[0];
};

const updateBook = async (values, id) => {
  const book = await db.query(
    `INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    values
  );
  return book.rows[0];
};

const deleteBook = async (id) => {
  const books = await db.query(`DELETE FROM books WHERE id = ${id} RETURNING *`);
  return books.rows[0];
};

module.exports = {
  createBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook
};
