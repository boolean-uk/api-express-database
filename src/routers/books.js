const express = require('express')
const router = express.Router()
const { getBooks, createBook, getBookById , deleteBookById, updateBookById} = require('../controllers/books')

router.get('/', getBooks)

router.post('/', createBook)

router.get('/:id', getBookById)

router.delete('/:id', deleteBookById)

router.put('/:id', updateBookById)

module.exports = router
