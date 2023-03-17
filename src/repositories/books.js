const db = require("../../db");

const getAllBooks = async () => {
  const bookdata = await db.query("SELECT * FROM books;");

  return bookdata.rows;
};

const createNewBook = async (str, values) => {
  const bookdata = await db.query(
    'INSERT INTO books ( title, type, author, topic, "publicationDate", pages) VALUES' +
      str +
      "RETURNING *;",
    values
  );

  return bookdata.rows[0];
};

const getBookById = async (str) => {
  const bookdata = await db.query(str);

  return bookdata.rows[0];
};

const updateBook = async (str, values) => {
  const bookdata = await db.query(
    "UPDATE books SET " + str + "RETURNING *",
    values
  );

  return bookdata.rows[0];
};

const deleteBook = async (str) => {
  const bookdata = await db.query("DELETE FROM books" + str + "RETURNING *");

  return bookdata.rows[0];
};

module.exports = {
  getAllBooks,
  createNewBook,
  getBookById,
  updateBook,
  deleteBook,
};
