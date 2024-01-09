const express = require("express");
const router = express.Router();
const db = require("../../db");

// GET route for retrieving all books from the database
router.get("/", async (req, res) => {
  // Execute SQL query to select all books
  const books = await db.query("SELECT * FROM books");
  // Respond with the fetched books in JSON format
  res.json({ books: books.rows });
});

// GET route for retrieving a single book by its ID
router.get("/:id", async (req, res) => {
  // Extract the book ID from the URL parameters
  const { id } = req.params;
  // Execute SQL query to select a book by its ID
  const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
  // Respond with the fetched book in JSON format
  res.status(200).json({ book: result.rows[0] });
});

// POST route for creating a new book
router.post("/", async (req, res) => {
  // Extract book details from request body
  const { title, type, author, topic, publication_date, pages } = req.body;
  // Execute SQL query to insert a new book into the database
  const newBook = await db.query(
    "INSERT INTO books (title, type, author, topic, publication_date, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [title, type, author, topic, publication_date, pages]
  );
  // Respond with the newly created book in JSON format
  res.status(201).json({ book: newBook.rows[0] });
});

// PUT route for updating an existing book by its ID
router.put('/:id', async (req, res) => {
  // Extract the book ID from URL parameters and book details from request body
  const { id } = req.params;
  const { title, type, author, topic, publication_date, pages } = req.body;
  
  // Execute SQL query to update the book with the given ID
  const updatedBook = await db.query(
    'UPDATE books SET title = $2, type = $3, author = $4, topic = $5, publication_date = $6, pages = $7 WHERE id = $1 RETURNING *',
    [id, title, type, author, topic, publication_date, pages]
  )
  // Respond with the updated book in JSON format
  res.status(201).json({ book: updatedBook.rows[0]})
})

// DELETE route for removing a book from the database by its ID
router.delete('/:id', async (req, res) => {
  // Extract the book ID from the URL parameters
  const { id } = req.params;
  
  // Execute SQL query to delete the book with the given ID
  const deletedBook = await db.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
  
  // Respond with the deleted book in JSON format
  res.status(201).json({ book: deletedBook.rows[0] })
})

module.exports = router;
