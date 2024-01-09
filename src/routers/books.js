const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
  const books = await db.query('SELECT * FROM books')
  res.json({ books: books.rows })
})

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    // The second parameter of the client `query` method takes an array of values
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    res.json({ book: result.rows[0] });
  });

module.exports = router
