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
  console.log('getBookById - repositories');
  const result = await db.query(`SELECT * FROM books WHERE id = ${id}`);
  return result.rows;
};

const createBook = async (values) => {
  console.log('createBook - repositories');
  const queryResult = await db.query(
    'INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    values
  );
  const response = {
    book: queryResult.rows[0],
  };
  return response;
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
};
