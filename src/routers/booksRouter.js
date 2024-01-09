const express = require('express')
const router = express.Router()
const db = require('../../db')

// Retrieve all books
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

// Create a book
router.post('/', async (req, res, next) => {
  const { title, type, author, topic, publication_date, pages } = req.body

  await db.query(
    'insert into books (title, type, author, topic, publication_date, pages) values ($1, $2, $3, $4, $5, $6);',
    [title, type, author, topic, publication_date, pages]
  )

  const createdBook = await db.query('select * from books where title = $1', [
    title
  ])

  res.status(201).json({ book: createdBook.rows[0] })
})

// Get a book by ID
router.get('/:id', async (req, res, next) => {
  const { id } = req.params

  const book = await db.query('select * from books where id = $1', [id])

  res.status(200).json({ book: book.rows[0] })
})

// Update a book
router.put('/:id', async (req, res, next) => {
  const { id } = req.params
  const { title, type, author, topic, publication_date, pages } = req.body

  await db.query(
    'update books set title = $1, type = $2, author = $3, topic = $4, publication_date = $5, pages = $6 where id = $7',
    [title, type, author, topic, publication_date, pages, id]
  )

  const updatedBook = await db.query('select * from books where id = $1', [id])

  res.status(201).json({ book: updatedBook.rows[0] })
})

// Delete a book
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  const book = await db.query('select * from books where id = $1', [id])

  await db.query('delete from books where id = $1', [id])

  res.status(201).json({ book: book.rows[0] })
})

module.exports = router
