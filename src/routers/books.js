const express = require('express')
const router = express.Router()

const { addBook, getAllBooks } = require('../controllers/booksControllers')

router.get('/', getAllBooks)

router.post('/', addBook)

module.exports = router
