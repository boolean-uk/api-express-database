const express = require('express')
const router = express.Router()
const { getAllBooks, createBook, getBookById, updateBook, deleteBook } = require('../dal/booksRepo.js')

router.get('/', async (req, res) => {
  const books = await getAllBooks()
  res.status(200).json({
    books
  })
})

router.post('/', async (req, res) => {
  const book = await createBook(req.body)
  res.status(201).json({
    book
  })
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const book = await getBookById(id)
  res.status(200).json({
    book
  })
})

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const newBookInfo = req.body

  const updatedBook = await updateBook(id, newBookInfo)

  res.status(201).json({
    book : updatedBook
  })
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const deletedBook = await deleteBook(id)
  res.status(201).json({
    book : deletedBook
  })
})

module.exports = router
