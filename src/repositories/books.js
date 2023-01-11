const db = require('../../db');

const getAllBooks = async () => {
  const result = await db.query('SELECT * FROM books');
  return result;
};

const getBookById = async (id) => {
  const result = await db.query(`SELECT * FROM books WHERE id = ${id}`);
  return result.rows;
};

const createBook = async (values) => {
  const result = await db.query(``, [values]);
  return result;
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
};
