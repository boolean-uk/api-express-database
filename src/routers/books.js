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

module.exports = router
