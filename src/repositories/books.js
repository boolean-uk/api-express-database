const db = require('../../db');

const getAllBooks = async () => {
  const result = await db.query('SELECT * FROM books');
  return result;
};

const getBookById = async (id) => {
  const result = await db.query(`SELECT * FROM books WHERE id = ${id}`);
  return result.rows;
};

module.exports = {
  getAllBooks,
  getBookById,
};
