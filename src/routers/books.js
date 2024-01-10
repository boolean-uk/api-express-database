const express = require("express");
const router = express.Router();

const {
  fetchAllBooks,
  fetchBookById,
  addBook,
} = require("../controllers/books");

// GET route for retrieving all books from the database
router.get("/", async (req, res) => {
  const books = await fetchAllBooks(req.query);
  return res.json({ books });
});

// GET route for retrieving a single book by its ID
router.get("/:id", async (req, res) => {
  const book = await fetchBookById(req.params.id);
  res.status(200).json({ book });
});

// POST route for creating a new book
router.post("/", async (req, res) => {
  const theNewBook = await addBook(req.body);
  res.status(201).json({ book: theNewBook });
});
module.exports = router;
