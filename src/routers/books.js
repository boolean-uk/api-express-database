const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const { type, topic } = req.query;
  if (type && topic) {
    const result = await db.query(
      "SELECT * FROM books WHERE type = $1 AND topic = $2",
      [type, topic]
    );
    res.json({ books: result.rows });
    return;
  }
  if (type) {
    const result = await db.query("SELECT * FROM books WHERE type = $1", [
      type,
    ]);
    res.json({ books: result.rows });
    return;
  }
  if (topic) {
    const result = await db.query("SELECT * FROM books WHERE topic = $1", [
      topic,
    ]);
    res.json({ books: result.rows });
    return;
  }

  const result = await db.query("SELECT * FROM books");
  res.json({ books: result.rows });
});

router.post("/", async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const result = await db.query(
    'INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [title, type, author, topic, publicationDate, pages]
  );
  res.status(201).json({ book: result.rows[0] });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
  res.json({ book: result.rows[0] });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, type, author, topic, publicationDate, pages } = req.body;

  const result = await db.query(
    'UPDATE books SET title = $1, type = $2, author = $3, topic = $4, "publicationDate" = $5, pages = $6 WHERE id = $7 RETURNING *',
    [title, type, author, topic, publicationDate, pages, id]
  );

  res.status(201).json({ book: result.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await db.query("DELETE FROM books WHERE id = $1 RETURNING *", [
    id,
  ]);
  res.status(201).json({ book: result.rows[0] });
});

module.exports = router;
