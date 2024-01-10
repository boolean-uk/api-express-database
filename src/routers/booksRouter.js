const express = require('express')
const router = express.Router()
const db = require('../../db')

//Global functions
const getBookById = async (id) => {
  const book = await db.query('select * from books where id = $1', [id])

  if (book.rows.length === 0) {
    const error = new Error(`no book with id: ${id}`)
    error.status = 404
    throw error
  }

  return book
}

// Retrieve all books
router.get('/', async (req, res) => {
  const { type, topic, author, page, perPage } = req.query

  // Error handling
  if (perPage < 10 || perPage > 50) {
    return res.status(400).json({
      error: `parameter invalid perPage: ${perPage} not valid. Accepted range is 10 - 50`
    })
  }

  const offset = (page - 1) * perPage

  const result = {}

  // States of filtered data
  const conditions = []
  const queryParams = []
  const paginator = []

  // Checking paginator queries
  if (page) {
    result.page = Number(page)
  }

  if (perPage) {
    result.per_page = Number(perPage)
  }

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
  } ${paginator.length > 0 ? paginator : 'LIMIT 20'}`

  // Send request to database
  const books = await db.query(query, queryParams)

  result.books = books.rows

  res.status(200).json(result)
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
  try {
    const { id } = req.params

    const book = await getBookById(id)

    res.status(200).json({ book: book.rows[0] })
  } catch (error) {
    res.status(error.status).json({ error: error.message })
  }
})

// Update a book
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, type, author, topic, publication_date, pages } = req.body

    await db.query(
      'update books set title = $1, type = $2, author = $3, topic = $4, publication_date = $5, pages = $6 where id = $7',
      [title, type, author, topic, publication_date, pages, id]
    )

    const updatedBook = await getBookById(id)

    res.status(201).json({ book: updatedBook.rows[0] })
  } catch (error) {
    res.status(error.status).json({ error: error.message })
  }
})

// Delete a book
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    const book = await getBookById(id)

    await db.query('delete from books where id = $1', [id])

    res.status(201).json({ book: book.rows[0] })
  } catch (error) {
    res.status(error.status).json({ error: error.message })
  }
})

module.exports = router
