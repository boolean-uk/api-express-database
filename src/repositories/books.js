const db = require('../../db');

const getAllBooks = async () => {
  const queryResult = await db.query('SELECT * FROM books');
  return queryResult.rows;
};

const getBookById = async (id) => {
  const queryResult = await db.query(`SELECT * FROM books WHERE id = ${id}`);
  return queryResult.rows[0];
};

const createBook = async (values) => {
  const queryResult = await db.query(
    'INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    values
  );
  return queryResult.rows[0];
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
};
