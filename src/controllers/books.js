const db = require("../../db");

// Function to get all books
const fetchAllBooks = async (queryParams) => {
  let selectQuery = "SELECT * FROM books";
  let books;

  if (queryParams.id) {
    selectQuery += " WHERE id = $1";
    books = await db.query(selectQuery, [queryParams.id]);
  } else {
    books = await db.query(selectQuery);
  }

  return books.rows;
};

// Function to retrieve a single book by ID
const fetchBookById = async (id) => {
  const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
  return result.rows[0];
};
// Function to add a new book
const addBook = async (bookData) => {
  const { title, type, author, topic, publication_date, pages } = bookData;
  const result = await db.query(
    "INSERT INTO books (title, type, author, topic, publication_date, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [title, type, author, topic, publication_date, pages]
  );
  return result.rows[0];
};

// Function to modify an existing book
const modifyBook = async (id, bookData) => {
  const { title, type, author, topic, publication_date, pages } = bookData;
  const result = await db.query(
    "UPDATE books SET title = $2, type = $3, author = $4, topic = $5, publication_date = $6, pages = $7 WHERE id = $1 RETURNING *",
    [id, title, type, author, topic, publication_date, pages]
  );
  return result.rows[0];
};

// Function to remove a book
const removeBook = async (id) => {
  const result = await db.query("DELETE FROM books WHERE id = $1 RETURNING *", [
    id,
  ]);
  return result.rows[0];
};

module.exports = {
  fetchAllBooks,
  fetchBookById,
  addBook,
  modifyBook,
  removeBook,
};
