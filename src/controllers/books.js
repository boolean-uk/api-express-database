const db = require("../../db");

const getAllBooks = async (query_params) => {
  let select_query = `SELECT * FROM books`;
  let books;

  if (query_params.id) {
    select_query += ` WHERE id = $1`;
    books = await db.query(select_query, [query_params.id]);
  } else {
    books = await db.query(select_query);
  }

  return books.rows;
};

const createBook = async (newBook) => {
  const { title, type, author, topic, publication_date, pages } = newBook;
  const result = await db.query(
    "INSERT INTO books (title, type, author, topic, publication_date, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [title, type, author, topic, publication_date, pages]
  );
  return result.rows[0];
};

const getBookById = async (id) => {
  const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
  return result.rows[0];
};

const updateBook = async (id, newBook) => {
  const { title, type, author, topic, publication_date, pages } = newBook;
  const result = await db.query(
    "UPDATE books SET title = $2, type = $3, author = $4, topic = $5, publication_date = $6, pages = $7 WHERE id = $1 RETURNING *",
    [id, title, type, author, topic, publication_date, pages]
  );
  return result.rows[0];
};

const deleteBook = async (id) => {
  const result = await db.query("DELETE FROM books WHERE id = $1 RETURNING *", [
    id,
  ]);
  return result.rows[0];
};

module.exports = {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
};
