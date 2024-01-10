const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/books.js");

// GET route for retrieving all books from the database
router.get("/", async (req, res) => {
  const books = await getAllBooks(req.query);
  return res.json({ books });
});

// GET route for retrieving a single book by its ID
router.get("/:id", async (req, res) => {
  const book = await getBookById(req.params.id);
  res.status(200).json({ book });
});

// POST route for creating a new book
router.post("/", async (req, res) => {
  const newBook = await createBook(req.body);
  res.status(201).json({ book: newBook });
});

// PUT route for updating an existing book by its ID
router.put("/:id", async (req, res) => {
  const updatedBook = await updateBook(req.params.id, req.body);
  res.status(201).json({ book: updatedBook });
});

// DELETE route for removing a book from the database by its ID
router.delete("/:id", async (req, res) => {
  const deletedBook = await deleteBook(req.params.id);
  res.status(201).json({ book: deletedBook });
});

module.exports = router;