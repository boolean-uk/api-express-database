const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
  const { type, topic } = req.query
  let query = 'SELECT * FROM books'
  const values = []
  if (type && topic) {
    values.push(type, topic)
    query += ' WHERE type ILIKE $1 AND topic ILIKE $2'
  }
  if (type && !topic) {
    values.push(type)
    query += ' WHERE type ILIKE $1'
  }
  if (!type && topic) {
    values.push(topic)
    query += ' WHERE topic ILIKE $1'
  }
  try {
    const result = await db.query(query, values)
    res.json({ books: result.rows})
  } catch (error) {
    res.status(500).json({error})
    console.error(error)
  }
})

router.post('/', async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const result = await db.query('INSERT INTO books (title, type, author, topic, "publicationDate", pages)' + 
  'VALUES ($1, $2, $3, $4, $5, $6)' +
  'RETURNING *', [title, type, author, topic, publicationDate, pages])
  res.status(201).json({book: result.rows[0]})
})

module.exports = router
