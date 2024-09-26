const db = require("../../db");

const getAllBooks = async (query_params) => {
  const { type, topic } = query_params;

  let select_query = "SELECT * FROM books";
  let books;

  if (type && topic) {
    books = await db.query(
      select_query.concat("WHERE type = $1 AND topic = $2"),
      [type, topic]
    );
  }

  if (type) {
    books = await db.query(select_query.concat("WHERE type = $1"), [type]);
  }

  if (topic) {
    books = await db.query(select_query.concat("WHERE topic = $1"), [topic]);
  }

  if (!topic && !type) {
    books = await db.query(select_query);
  }

  return books.rows;
};

const createBook = async (request_body) => {
  const { title, type, author, topic, publication_date, pages } = request_body;

  const newBook = await db.query(
    "INSERT INTO books(title, type, author, topic, publication_date, pages) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
    [title, type, author, topic, publication_date, pages]
  );

  return newBook.rows[0];
};

const getBookById = async (id) => {
  const bookById = await db.query("SELECT * FROM books WHERE id = $1", [id]);

  if (bookById.rows.length > 0) {
    return bookById.rows[0];
  }

  return false;
};

const updateBook = async (id, request_body) => {
  const { title, type, author, topic, publication_date, pages } = request_body;

  const updatedBook = await db.query(
    "UPDATE books SET title = $1, type = $2, author = $3, topic = $4, publication_date = $5, pages = $6 WHERE id = $7 RETURNING * ",
    [title, type, author, topic, publication_date, pages, id]
  );

  return updatedBook.rows[0];
};

const deleteBook = async (id) => {
  const deletedBook = await db.query(
    "DELETE FROM books WHERE id = $1 RETURNING *",
    [id]
  );

  return deletedBook.rows[0];
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  updateBook,
};
