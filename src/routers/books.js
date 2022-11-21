const express = require("express");
const router = express.Router();
const db = require("../../db");

// GET

router.get("/", async (req, res) => {
  const sqlQuery = `select * from books`;
  const result = await db.query(sqlQuery);
  res.json({
    books: result.rows,
  });
});

router.get("/:id", async (req, res) => {
  const sqlQuery = `select * from books where id = $1`;
  const result = await db.query(sqlQuery, [req.params.id]);
  res.json({
    book: result.rows,
  });
});

// POST

router.post("/", async (req, res) => {
  const sqlQuery = `INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const newDate = new Date(req.body.publicationDate);
  const result = await db.query(sqlQuery, [
    req.body.title,
    req.body.type,
    req.body.author,
    req.body.topic,
    newDate,
    req.body.pages,
  ]);
  res.json({
    book: result.rows,
  });
});

// PUT

router.put("/:id", async (req, res) => {
  const bookID = req.params.id;
  const sqlQuery = `UPDATE books SET title = $1, type = $2, author = $3, topic = $4, "publicationDate" = $5, pages = $6 WHERE id = $7 RETURNING *`;
  const newDate = new Date(req.body.publicationDate);
  const result = await db.query(sqlQuery, [
    req.body.title,
    req.body.type,
    req.body.author,
    req.body.topic,
    newDate,
    req.body.pages,
    bookID,
  ]);
  res.status(201).json({ book: result.rows });
});

// DELETE

router.delete("/:id", async (req, res) => {
  const sqlQuery = `DELETE FROM books WHERE id = $1`;
  const result = await db.query(sqlQuery, [req.params.id]);
  res.status(201).json({ message: "Deleted" });
});

module.exports = router;
