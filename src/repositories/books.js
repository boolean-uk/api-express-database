const db = require('../../db');

const getAllBooks = async () => {
  console.log('getAllBooks - repositories');
  const queryResult = await db.query('SELECT * FROM books');
  const response = {
    books: queryResult.rows,
  };
  return response;
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
