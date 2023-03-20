const express = require("express");
const router = express.Router();
const db = require("../../db");

const books = require("../routers/books.js");

router.get("/", async (req, res) => {
  const bookdata = await db.query("SELECT * FROM books;");

  res.status(200).json({ books: bookdata.rows });
});

// router.get("/:id", async (req, res) => {
//     const id = req.params.id;
//   const { title, type, author, topic, publicationDate, pages } = req.body;

//   const book = await db.query("SELECT * FROM books WHERE id = $id RETURNING *;");
//   console.log("book =", book);

//   res.status(200).json({ book });
// });

router.post("/", async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const values = [title, type, author, topic, publicationDate, pages];
  const book = await db.query("SELECT * FROM books;");

  res.status(201).json({ book });
});

router.delete("/:id", async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;

  const id = req.params.id;
  let sql = "DELETE FROM books WHERE id = " + id;
  const bookdata = await db.query("SELECT * FROM books");
  const book = bookdata.rows[0];

  console.log(" bookdata.rows[0].id =", book);

  res.status(201).json({ Books: book });
});

module.exports = router;
