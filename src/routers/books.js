const express = require('express')
const router = express.Router()
const booksController = require('../controllers/books')

router.get('/', booksController.getAllBooks)

router.post('/', booksController.addNewBook)

router.get('/:id', booksController.getBookByID)

router.put('/:id', booksController.updateBook)

router.delete('/:id', booksController.deleteBook)

module.exports = router
