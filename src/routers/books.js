const express = require('express')
const router = express.Router()

const { addBook, getAllBooks, getBookById } = require('../controllers/booksControllers')

router.get('/', getAllBooks)

router.post('/', addBook)

router.get('/:id', getBookById)

module.exports = router
