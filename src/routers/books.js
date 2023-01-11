const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const book = await db.query("SELECT * FROM books");
  res.json({ books: book.rows });
});

router.post("/", async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const book =
    await db.query(`INSERT INTO books (title, type, author, topic, "publicationDate", pages)
    VALUES ('${title}', '${type}', '${author}', '${topic}', '${publicationDate}', '${pages}')    
    RETURNING *
    `);
  res.status(201).json({ book: book.rows[0] });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const book = await db.query(`SELECT * FROM books WHERE id = '${id}'`);
  res.json({ book: book.rows[0] });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, type, author, topic, publicationDate, pages } = req.body;

  const result =
    await db.query(`UPDATE books SET title = '${title}', type = '${type}', 
  author = '${author}', topic = '${topic}', "publicationDate" = '${publicationDate}', pages = '${pages}'
  WHERE id = ${id} RETURNING *
  `);
  res.status(201).json({ book: result.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const book = await db.query(`DELETE FROM books WHERE id = ${id}
  RETURNING *`);
  res.status(201).json({ book: book.rows[0] });
});
module.exports = router;
