const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const books = await db.query("SELECT * FROM books");
  console.group(books);
  res.json({ books: books.rows });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.query(`SELECT * FROM books WHERE id = $1`, [id]);
  res.json({ book: result.rows[0] });
});

router.post("/", async (req, res) => {
  const { title, type, author, topic, publication_date, pages } = req.body;

  const newBook = await db.query(
    "INSERT INTO books (title,type,author,topic,publication_date,pages) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [title, type, author, topic, publication_date, pages ] 
  );

  res.status(201).json({ book: newBook.rows[0] });
});
module.exports = router;
