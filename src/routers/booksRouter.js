const express = require('express')
const router = express.Router()
const db = require('../../db')

// Retrieve all books
router.get('/', async (req, res) => {
  const { type, topic, author, page, perPage } = req.query

  const offset = (page - 1) * perPage

  // States of filtered data
  const conditions = []
  const queryParams = []
  const paginator = []

  // Checking all provided data and combine all of them for request
  if (type) {
    conditions.push('type = $1')
    queryParams.push(type)
  }

  if (topic) {
    conditions.push(`topic = $${queryParams.length + 1}`)
    queryParams.push(topic)
  }

  if (author) {
    conditions.push(`author = $${queryParams.length + 1}`)
    queryParams.push(author)
  }

  if (perPage && !offset) {
    paginator.push(`LIMIT $${queryParams.length + 1}`)
    queryParams.push(perPage)
  }

  if (offset) {
    paginator.push(
      `LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`
    )
    queryParams.push(perPage, offset)
  }

  // Creating request
  const query = `SELECT * FROM books${
    conditions.length > 0 ? ' WHERE ' + conditions.join(' AND ') : ''
  } ${paginator.length > 0 && paginator}`

  // Send request to database
  const result = await db.query(query, queryParams)

  res.status(200).json({ books: result.rows })
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
