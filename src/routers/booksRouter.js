const express = require('express')
const router = express.Router()
const db = require('../../db')

router.get('/', async (req, res) => {
  const { type, topic } = req.query
  let books = null

  if (type) {
    books = await db.query('select * from books where type = $1', [type])
  }

  if (topic) {
    books = await db.query('select * from books where type = $1', [topic])
  }

  if (!type && !topic) {
    books = await db.query('select * from books')
  }

  res.status(200).json({ books: books.rows })
})

module.exports = router
