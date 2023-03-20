const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const bookdata = await db.query("SELECT * FROM books;");

  res.status(200).json({ books: bookdata.rows });
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

  let str = "SELECT * FROM books WHERE id = $1";
  const values = [id];
  const data = await db.query(str, values);
  const book = data.rows[0];

  console.log("book =", book);

  res.status(200).json({ book });
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  let str = "DELETE FROM books WHERE id = $1 RETURNING *;";
  const values = [id];
  const data = await db.query(str, values);
  const book = data.rows[0];

  console.log(" bookdata.rows[0].id =", book);

  res.status(201).json({ book });
});

module.exports = router;
