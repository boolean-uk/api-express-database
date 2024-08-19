const express = require("express");
const router = express.Router();
const db = require("../../db");

// GET REQUESTS

router.get("/", async (req, res) => {
  const response = await db.query("select * from books");
  res.json({ books: response.rows });
});

router.get("/:id", async (req, res) => {
  const response = await db.query(
    `select * from books where id = ${req.params.id};`
  );
  res.json({ book: response.rows[0] });
});

// POST REQUESTS

router.post("/", async (req, res) => {
  let postedBook = req.body;
  const response = await db.query(
    `INSERT INTO books (title, type, author, topic, publication_date, pages) VALUES ('${postedBook.title}', '${postedBook.type}', '${postedBook.author}', '${postedBook.topic}', '${postedBook.publication_date}', ${postedBook.pages}) RETURNING *`
  );
  res.status(201).json({ book: response.rows[0] });
});

// PUT REQUESTS

router.put("/:id", async (req, res) => {
  let postedBook = req.body;
  const response = await db.query(
    `UPDATE books SET (title, type, author, topic, publication_date, pages) = ('${postedBook.title}', '${postedBook.type}', '${postedBook.author}', '${postedBook.topic}', '${postedBook.publication_date}', ${postedBook.pages}) WHERE id = ${req.params.id} RETURNING *`
  );
  res.status(201).json({ book: response.rows[0] });
});

// DELETE REQUESTS

router.delete("/:id", async (req, res) => {
  const response = await db.query(
    `DELETE FROM books WHERE id = ${req.params.id} RETURNING *;`
  );
  res.status(201).json({ book: response.rows[0] });
});

module.exports = router;
