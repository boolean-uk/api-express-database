const express = require('express');
const router = express.Router();
const db = require("../../db");

router.get('/', async (req, res) => {
  const { type, topic } = req.query

  let string = 'SELECT * FROM books WHERE type = $1'

  if (type === 'Fiction' || type === 'Non-Fiction') {
    const result = await db.query('SELECT * FROM books WHERE type = $1', [type])
    return res.json({ books: result.rows })
  }

  
  const result = await db.query('SELECT * FROM books')
  res.json({ books: result.rows })
})

module.exports = router
