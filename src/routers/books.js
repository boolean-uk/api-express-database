const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const { type } = req.query;
  if (type) {
    const result = await db.query(`SELECT * FROM books WHERE type = '${type}'`);
    res.json({ books: result.rows });
    return;
  }
  const result = await db.query("SELECT * FROM books");
  res.json({ books: result.rows });
});

router.post("/", async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const result = await db.query(
    `INSERT INTO books (title, type, author, topic, "publicationDate", pages) 
    VALUES ('${title}', '${type}','${author}', '${topic}','${publicationDate}', ${pages})
    RETURNING *
    `
  );
  res.status(201).json({ book: result.rows[0] });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.query(`SELECT * FROM books
  WHERE id = ${id}
  `);
  res.json({ book: result.rows });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, type, author, topic, publicationDate, pages } = req.body;

  const result = await db.query(`
    UPDATE books
    SET title = '${title}', type = '${type}', author = '${author}', topic = '${topic}', "publicationDate" = '${publicationDate}', pages = ${pages}
    WHERE id = ${id}
    RETURNING *
    `);
  res.status(201).json({ book: result.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await db.query(`
    DELETE FROM books
    WHERE id = ${id}
    RETURNING *
    `);
  res.status(201).json({ book: result.rows[0] });
});

module.exports = router;
