const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM books");
  return res.json({ books: result.rows });
});

router.post("/", async (req, res) => {
  const { title, type, author, topic, publication_date, pages } = req.body;
  await db.query(
    "INSERT INTO books (title, type, author, topic, publication_date, pages) VALUES ( $1, $2, $3, $4, $5, $6);",
    [title, type, author, topic, publication_date, pages]
  );
  const result = await db.query("SELECT * FROM books WHERE title = $1", [
    title,
  ]);
  return res.status(201).json({ book: result.rows[0] });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
  return res.json({ book: result.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const itemToDelete = await db.query("SELECT * FROM books WHERE id = $1", [
    id,
  ]);
  await db.query("DELETE FROM books WHERE id = $1", [id]);
  return res.status(201).json({ book: itemToDelete.rows[0] });
});

module.exports = router;
