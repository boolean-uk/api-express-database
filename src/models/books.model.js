const db = require('../../db');
const { buildQuery } = require('../utils');
const { existsInDb } = require('./utils');

const getAllBooks = async req => {
  const base = 'SELECT * FROM books';
  const [sqlQuery, sqlParams] = buildQuery(base, req.query);

  try {
    const dbRes = await db.query(sqlQuery, sqlParams);

    return dbRes.rows;
  } catch (error) {
    console.error('[DATABASE ERROR]', error);
  }
};

const getBookById = async bookId => {
  const sqlQuery = 'SELECT * FROM books WHERE id = $1';

  try {
    const dbRes = await db.query(sqlQuery, [bookId]);

    return dbRes.rows[0] || {};
  } catch (error) {
    console.error('[DATABASE ERROR]', error);
  }
};

const postBook = async params => {
  const sqlQuery = `
    INSERT INTO
        books(title, type, author, topic, publicationdate, pages)
    VALUES
        ($1, $2, $3, $4, $5, $6)
    RETURNING *;`;

  try {
    const dbRes = await db.query(sqlQuery, params);
    return dbRes.rows[0];
  } catch (error) {
    console.error('[DATABASE ERROR]', error);
    return false;
  }
};

const updateBook = async (params, bookId, title) => {
  const titleExistsSqlQuery = 'SELECT * FROM books WHERE title = $1';

  const sqlQuery = `
      UPDATE
          books
      SET
          title = $1, type = $2, author = $3, topic = $4, publicationdate = $5, pages = $6
      WHERE
          id = $7
      RETURNING *;`;

  try {
    if (await existsInDb(titleExistsSqlQuery, [title])) {
      return 'title already exists';
    }

    const dbRes = await db.query(sqlQuery, [...params, bookId]);

    return dbRes.rows[0] || {};
  } catch (error) {
    console.error('[DATABASE ERROR]', error);
  }
};

const deleteBook = async bookId => {
  const sqlQuery = 'DELETE FROM books WHERE id = $1 RETURNING *;';

  try {
    const dbRes = await db.query(sqlQuery, [bookId]);

    return dbRes.rows[0] || {};
  } catch (error) {
    console.error('[DATABASE ERROR]', error);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  postBook,
  updateBook,
  deleteBook,
};
