const db = require("../../db");

// Function to get all books
const getAllBooks = async (query_params) => {
  let select_query = 'SELECT * FROM books';
  let books;

  if (query_params.id) {
    select_query += ' WHERE id = $1';
    books = await db.query(select_query, [query_params.id]);
  } else {
    books = await db.query(select_query);
  }

  return books.rows;
};

// Function to get a single book by ID
const getBookById = async (id) => {
  const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
  return result.rows[0];
};

// Function to create a new book
const createBook = async (bookData) => {
  const { title, type, author, topic, publication_date, pages } = bookData;
  const result = await db.query(
    "INSERT INTO books (title, type, author, topic, publication_date, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [title, type, author, topic, publication_date, pages]
  );
  return result.rows[0];
};

// Function to update an existing book
const updateBook = async (id, bookData) => {
  const { title, type, author, topic, publication_date, pages } = bookData;
  const result = await db.query(
    "UPDATE books SET title = $2, type = $3, author = $4, topic = $5, publication_date = $6, pages = $7 WHERE id = $1 RETURNING *",
    [id, title, type, author, topic, publication_date, pages]
  );
  return result.rows[0];
};

// Function to delete a book
const deleteBook = async (id) => {
  const result = await db.query("DELETE FROM books WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };