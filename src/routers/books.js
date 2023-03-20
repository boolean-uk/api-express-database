const express = require("express");
const router = express.Router();
const db = require("../../db");

// GET All books
router.get("/", async (req, res) => {
  const str = "SELECT * FROM books;";

  const values = [];
  const data = await db.query(str, values);
  const books = data.rows;
  res.json({ books });
});

// GET A book
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const str = "SELECT * FROM books WHERE id = $1";
  const values = [id];

  const data = await db.query(str, values);
  const book = data.rows[0];
  res.status(200).json({ book });
});

router.post("/", async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const values = [title, type, author, topic, publicationDate, pages];
  // console.log("THE VALUES ==> ", values);

  const str =
    'INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';
  const data = await db.query(str, values);
  res.status(201).json({ book: data.rows[0] });
});

router.put("/:id", async (req, res) => {
  // Get the ID from paams and then info of the book to update from req.body
  const id = req.params.id;
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const values = [id, title, type, author, topic, publicationDate, pages];

  const str =
    'UPDATE books SET title = $2, type = $3, author = $4, topic = $5, "publicationDate" = $6, pages = $7 WHERE id = $1 RETURNING *;';

  const data = await db.query(str, values);
  res.status(201).json({ book: data.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const values = [id];

  const str = "DELETE FROM books WHERE id = $1 RETURNING *;";
  const data = await db.query(str, values);
  console.log("DATA DELETE ==> ", data);
  res.status(201).json({ book: data.rows[0] });
});

module.exports = router;
