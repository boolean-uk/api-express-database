const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const { title, author } = req.query;

  if (title && author) {
    const books = await db.query(
      "SELECT * FROM books WHERE title = $1 AND author = $2",
      [title, author]
    );

    return res.json({ books: books.rows });
  }

  if (title) {
    const books = await db.query("SELECT * FROM books WHERE title = $1", [
      title,
    ]);

    return res.json({ books: books.rows });
  }

  if (author) {
    const books = await db.query("SELECT * FROM books WHERE author = $1", [
      author,
    ]);

    return res.json({ books: books.rows });
  }

  const books = await db.query("SELECT * FROM books");
  res.json({ books: books.rows });
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const book = await db.query("SELECT * FROM books WHERE id = $1", [id]);

  res.json({ book: book.rows[0] });
});

router.post("/", async (req, res) => {
  const { title, type, author, topic, publication_date, pages } = req.body;

  const existingBook = await db.query("SELECT * FROM books WHERE title = $1", [
    title,
  ]);

  if (existingBook.rows.length > 0) {
    if (existingBook.rows[0].title === title) {
      res
        .status(409)
        .json({ error: "A book with the provided title already exists" });
    }
  }

  const newBook = await db.query(
    "INSERT INTO books (title, type, author, topic, publication_date, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ",
    [title, type, author, topic, publication_date, pages]
  );

  res.status(201).json({ book: newBook.rows[0] });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, type, author, topic, publication_date, pages } = req.body;

  const updatedBook = await db.query(
    "UPDATE books SET title = $2, type = $3, author = $4, topic = $5, publication_date = $6, pages = $7 WHERE id = $1 RETURNING *",
    [id, title, type, author, topic, publication_date, pages]
  );

  res.status(201).json({ book: updatedBook.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const deletedBook = await db.query(
    "DELETE FROM books WHERE id = $1 RETURNING *",
    [id]
  );

  res.status(201).json({ book: deletedBook.rows[0] });
});

module.exports = router;
