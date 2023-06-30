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

router.post('/', async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body
  console.log(req.body)
  const result = await db.query('INSERT INTO books (title, type, author, topic, "publicationDate", pages) ' + 
    'VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
    [ title, type, author, topic, publicationDate, pages ])
  return res.status(201).json({ book: result.rows[0] })
})


module.exports = router
