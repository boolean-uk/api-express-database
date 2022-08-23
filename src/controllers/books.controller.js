const db = require('../../db');
const { buildQuery } = require('../utils');

const getAllBooks = async (req, res) => {
  const base = 'SELECT * FROM books';
  const [sqlQuery, sqlParams] = buildQuery(base, req.query);

  const dbRes = await db.query(sqlQuery, sqlParams);

  res.status(200).json({
    books: dbRes.rows,
  });
};

const getBookById = async (req, res) => {
  const bookId = req.params.id;
  const sqlQuery = 'SELECT * FROM books WHERE id = $1';

  const dbRes = await db.query(sqlQuery, [bookId]);

  dbRes.rows.length > 0
    ? res.status(200).json({
        book: dbRes.rows[0],
      })
    : res
        .status(404)
        .json({ error: 'A book with the provided ID does not exist' });
};

const postBook = async (req, res) => {
  const sqlQuery = `
    INSERT INTO
        books(title, type, author, topic, publicationdate, pages)
    VALUES
        ($1, $2, $3, $4, $5, $6)
    RETURNING *;`;

  const params = Object.values(req.body);
  if (params.length < 6) {
    res.status(400).json({ error: 'Missing fields in the request body' });
    return;
  }

  const dbRes = await db.query(sqlQuery, params);

  res.status(201).json({
    book: dbRes.rows[0],
  });
};

const updateBook = async (req, res) => {
  const { rows } = await db.query('SELECT * FROM books WHERE title = $1', [
    req.body.title,
  ]);

  if (rows.length > 0) {
    res
      .status(409)
      .json({ error: 'A book with the provided title already exists' });
    return;
  }

  const bookId = req.params.id;

  const sqlQuery = `
      UPDATE
          books
      SET
          title = $1, type = $2, author = $3, topic = $4, publicationdate = $5, pages = $6
      WHERE
          id = $7
      RETURNING *;`;

  const params = Object.values(req.body);
  const dbRes = await db.query(sqlQuery, [...params, bookId]);

  dbRes.rows.length > 0
    ? res.status(201).json({
        book: dbRes.rows[0],
      })
    : res
        .status(404)
        .json({ error: 'A book with the provided ID was not found' });
};

const deleteBook = async (req, res) => {
  const bookId = req.params.id;

  const sqlQuery = 'DELETE FROM books WHERE id = $1 RETURNING *;';

  const dbRes = await db.query(sqlQuery, [bookId]);

  dbRes.rows.length > 0
    ? res.status(201).json({
        book: dbRes.rows[0],
      })
    : res
        .status(404)
        .json({ error: 'A book with the provided ID was not found' });
};

module.exports = { getAllBooks, getBookById, postBook, updateBook, deleteBook };
