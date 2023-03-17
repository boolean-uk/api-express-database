const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  let str = `SELECT * FROM books `;
  const queries = req.query;

  if (queries.page === undefined) queries.page = 0;
  else queries.page--;
  if (queries.per_page === undefined) queries.per_page = 20;
  else queries.per_page = Math.min(Math.max(queries.per_page, 10), 50);
  queries.page = queries.page * queries.per_page;
  const values = [queries.per_page, queries.page];

  if (queries.author) {
    values.push(queries.author);
    str += `WHERE author = $3`;
  }

  str += `LIMIT $1 OFFSET $2 ;`;
  const data = await db.query(str, values);
  const books = data.rows;
  res.json({ books });
});

router.post("/", async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const str = `INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
  const values = [title, type, author, topic, publicationDate, pages];
  const data = await db.query(str, values);
  res.status(201).json({ book: data.rows[0] });
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const str = `SELECT * FROM books WHERE id = $1;`;
  const values = [id];
  const data = await db.query(str, values);
  if (data.rowCount === 0) {
    res.status(404).json({ error: `no book with id: ${req.params.id}` });
    return;
  }
  res.json({ book: data.rows[0] });
});

router.put("/:id", async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const id = Number(req.params.id);
  const str = `UPDATE books SET title = $2, type = $3, author = $4, topic = $5, "publicationDate" = $6, pages = $7 WHERE id = $1 RETURNING *;`;
  const values = [id, title, type, author, topic, publicationDate, pages];
  const data = await db.query(str, values);
  if (data.rowCount === 0) {
    res.status(404).json({ error: `no book with id: ${req.params.id}` });
    return;
  }
  res.status(201).json({ book: data.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const str = `DELETE FROM books WHERE id = $1 RETURNING *;`;
  const values = [id];
  const data = await db.query(str, values);
  if (data.rowCount === 0) {
    res.status(404).json({ error: `no book with id: ${req.params.id}` });
    return;
  }
  res.status(201).json({ book: data });
});

module.exports = router;
