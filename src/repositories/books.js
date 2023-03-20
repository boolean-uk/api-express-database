const db = require("../../db");

const getBooks = async (values) => {
  let str = `SELECT * FROM books `;
  if (values.length === 3) {
    str += `WHERE author = $3 `;
  }
  str += `LIMIT $1 OFFSET $2 ;`;
  return await db.query(str, values);
};

const postBook = async (values) => {
  const str = `INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
  return await db.query(str, values);
};

const getBookById = async (values) => {
  const str = `SELECT * FROM books WHERE id = $1;`;
  return await db.query(str, values);
};

const updateBookById = async (values) => {
  const str = `UPDATE books SET title = $2, type = $3, author = $4, topic = $5, "publicationDate" = $6, pages = $7 WHERE id = $1 RETURNING *;`;
  return await db.query(str, values);
};

const deleteBookById = async (values) => {
  const str = `DELETE FROM books WHERE id = $1 RETURNING *;`;
  return await db.query(str, values);
};

module.exports = {
  getBooks,
  postBook,
  getBookById,
  updateBookById,
  deleteBookById,
};
