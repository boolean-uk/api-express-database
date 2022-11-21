const db = require("../../db");

const getAllBooks = async () => {
  const sqlQuery = `SELECT * FROM books`;

  try {
    const result = await db.query(sqlQuery);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Database Error");
  }
};

const getBookById = async (bookId) => {
  const sqlQuery = `select * from books where id = $1`;
  console.log(bookId);
  try {
    const result = await db.query(sqlQuery, [bookId]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Database Error");
  }
};

const addBook = async (book) => {
  const sqlQuery = `INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

  const params = [
    book.title,
    book.type,
    book.author,
    book.topic,
    book.publicationDate,
    book.pages,
  ];

  return await db
    .query(sqlQuery, params)
    .then((result) => result.rows[0])
    .catch((error) => {
      console.error(error);
      throw new Error("Database Error");
    });
};

const updateBook = async (bookId, book) => {
  const sqlQuery = `UPDATE books SET title = $1, type = $2, author = $3, topic = $4, "publicationDate" = $5, pages = $6 WHERE id = $7 RETURNING *`;

  const params = [
    book.title,
    book.type,
    book.author,
    book.topic,
    book.publicationDate,
    book.pages,
    bookId,
  ];

  return await db
    .query(sqlQuery, params)
    .then((result) => result.rows[0])
    .catch((error) => {
      console.error(error);
      throw new Error("Database Error");
    });
};

const deleteBook = async (bookId) => {
  const sqlQuery = `DELETE FROM books WHERE id = $1`;

  try {
    await db.query(sqlQuery, [bookId]);
    return;
  } catch (error) {
    console.error(error);
    throw new Error("Database Error");
  }
};

module.exports = {
  getAllBooks,
  addBook,
  getBookById,
  updateBook,
  deleteBook,
};
