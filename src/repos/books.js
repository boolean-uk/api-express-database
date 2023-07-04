const db = require("../../db");

const getBooks = async (myQuery, values, perPage, offset) => {
  let query = `SELECT * from books ${myQuery}`;

  if (perPage && offset) {
    query += ` LIMIT ${perPage} OFFSET ${offset}`;
  } else {
    query += ` LIMIT 20 OFFSET 0`;
  }

  return await db.query(query, values);
};

const getBooksID = async (id) => {
  return await db.query("SELECT * from books WHERE id = $1", [id]);
};

const createBook = async (
  title,
  type,
  author,
  topic,
  publicationDate,
  pages
) => {
  return await db.query(
    'INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    [title, type, author, topic, publicationDate, pages]
  );
};

const checkBookTitle = async (title, id) => {
  return await db.query("SELECT * FROM books WHERE title = $1 AND id != $2", [
    title,
    id,
  ]);
};

const updateBook = async (
  id,
  title,
  type,
  author,
  topic,
  publicationDate,
  pages
) => {
  return await db.query(
    'UPDATE books SET title = $2, type = $3, author = $4, topic = $5, "publicationDate" = $6, pages = $7 WHERE id = $1 RETURNING * ',
    [id, title, type, author, topic, publicationDate, pages]
  );
};

const deleteBook = async (id) => {
  return await db.query("DELETE FROM books WHERE id = $1 RETURNING *", [id]);
};

module.exports = {
  getBooks,
  getBooksID,
  createBook,
  checkBookTitle,
  updateBook,
  deleteBook,
};
