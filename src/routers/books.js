const express = require('express')
const router = express.Router()
const booksController = require('../controllers/books.js')

router.get('/', booksController.getBooks)
router.get('/:id', booksController.getBook)
router.post('/', booksController.createBook)
router.put('/:id', booksController.putBook)
router.delete('/:id', booksController.deleteBook)


module.exports = router
