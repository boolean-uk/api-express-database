const express = require('express')
const router = express.Router()
const { getAllBooks, createBook } = require('../dal/booksRepo.js')

router.get('/', async (req, res) => {
  const books = await getAllBooks()
  res.status(200).json({
    books
  })
})

router.post('/', async (req, res) => {
  const book = await createBook(req.body)
  res.status(200).json({
    book
  })
})

module.exports = router
