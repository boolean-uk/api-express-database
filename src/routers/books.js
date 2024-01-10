const express = require('express')
const router = express.Router()
const db = require("../../db");

const extractParams = require('../helper')

router.get('/', async (req, res) => {
  const queryParamsKeys = Object.keys(req.query)

  let queryStr = 'SELECT * from books'
  if (queryParamsKeys) {
    queryParamsKeys.forEach((param, index) => {
      const keywordPrefix = index === 0 ? "WHERE" : "AND"
      queryStr = queryStr.concat(" ", keywordPrefix)
      queryStr = queryStr.concat(" ", `${param} = '${req.query[param]}'`)
    })
  }

  const books = await db.query(queryStr)
  res.json({ books: books.rows })
})

router.post('/', async (req, res) => {
  const { title, type, author, topic, publication_date, pages } = req.body
  const values = [title, type, author, topic, publication_date, pages]

  const book = await db.query('INSERT INTO books (title, type, author, topic, publication_date, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', values)
  res.json( { book: book.rows })
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const book = await db.query('SELECT * FROM books WHERE id = $1', [id])
  res.json( { book: book.rows[0] } )
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { title, type, author, topic, publication_date, pages } = req.body

  const values = [id, title, type, author, topic, publication_date, pages]

  const book = await db.query('UPDATE books SET title = $2, type = $3, author = $4, publication_date = $5, pages = $6 WHERE id = $1 RETURNING *', values)
  console.log(book)

  res.json( { book: book.rows[0] } )
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const book = await db.query('DELETE FROM books WHERE id = $1 RETURNING *', [id])
  res.json( { book: book.rows[0] } )
})

module.exports = router
