const express = require('express')
const router = express.Router()

const { getAllBooks, createNewBook, getBookById, updateBook, deleteBook } = require('../controllers/books.js')

// GET ALL BOOKS (INC. QUERY PARAMS)
router.get('/', getAllBooks)

// CREATE A BOOK
router.post('/', createNewBook)

// GET A BOOK BY ID
router.get('/:id', getBookById)

// UPDATE A BOOK (BY ID)
router.put('/:id', updateBook)

// DELETE A BOOK (BY ID)
router.delete('/:id', deleteBook)

module.exports = router
