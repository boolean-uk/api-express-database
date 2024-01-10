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

module.exports = {
  fetchAllBooks,
  fetchBookById,
  addBook,
};
