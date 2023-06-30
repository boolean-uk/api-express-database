const express = require("express");
const router = express.Router();
const db = require("../../db/index");

// Retrieve all books
router.get("/", async (req, res) => {
  const result = await db.query(`SELECT * FROM books`);
  if (result) {
    res.json({ books: result.rows });
  } else {
    res.send("No books exist");
  }
});

// Get a book by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.query(`SELECT * FROM books WHERE id = $1`, [id]);
  if (result.rows.length) {
    res.json({ book: result.rows[0] });
  } else {
    res.send(
      `Book with the id of ${id} does not exist in our books collection`
    );
  }
});

// Create a book
router.post("/", async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const result = await db.query(
    `INSERT INTO books (title, type, author, topic, "publicationDate", pages)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
    [title, type, author, topic, publicationDate, pages]
  );
  res.status(201).json({ book: result.rows[0] });
});

// Update a book
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const result = await db.query(
    `
    UPDATE books
    SET title = $2, type = $3, author = $4, topic = $5, "publicationDate" = $6, pages = $7
    WHERE id = $1
    RETURNING *`,
    [id, title, type, author, topic, publicationDate, pages]
  );
  res.status(201).json({ book: result.rows[0] });
});

// Delete a book
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.query(
    `
  DELETE FROM books
  WHERE id = $1
  RETURNING *`,
    [id]
  );
  res.status(201).json({ book: result.rows[0] });
});

module.exports = router;
