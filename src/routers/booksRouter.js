const express = require('express')
const router = express.Router()
const db = require('../../db')

router.get('/', async (req, res, next) => {
  const books = await db.query('SELECT * FROM books')

  res.status(200).json({ books: books.rows })
})

module.exports = router
