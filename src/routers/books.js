const express = require('express')
const router = express.Router()
const booksController = require('../controllers/books.js')

router.get('/', booksController.getBooks)
router.get('/:id', booksController.getBook)
router.post('/', booksController.createBook)

module.exports = router
