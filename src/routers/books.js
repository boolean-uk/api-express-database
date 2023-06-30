const express = require('express');
const router = express.Router();
const db = require("../../db");

router.get('/', async (req, res) => {
  const { type, topic } = req.query
  let hasType
  let hasTopic
  let result

  if (type === 'Fiction' || type === 'Non-Fiction') {
    hasType = true
  }

  if (topic) {
    hasTopic = true
  }

  if(hasType && hasTopic) {
    result = await db.query('SELECT * FROM books WHERE type = $1 AND topic = $2', [type, topic])
  } else if(hasType) {
    result = await db.query('SELECT * FROM books WHERE type = $1', [type])
  } else if(hasType) {
    result = await db.query('SELECT * FROM books WHERE topic = $1', [topic])
  } else {
    result = await db.query('SELECT * FROM books')
  }
  
  res.json({ books: result.rows })
})

module.exports = router
