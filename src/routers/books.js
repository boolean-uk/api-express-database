const express = require('express')
const { getAllBooks, createBook } = require('../../dal/booksRepo.js')
const router = express.Router()

router.get('/', async (req, res) => {
    const type = req.query.type
    const topic = req.query.topic

    const books = await getAllBooks(type, topic)

    res.json({
        books
    })
})

router.post('/', async (req, res) => {
    const book = req.body

    const newBook = await createBook(book)

    res.json({
        book: newBook
    })
})

module.exports = router
