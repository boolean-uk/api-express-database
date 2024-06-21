const express = require('express')
const { getAllBooks, createBook, getBookById } = require('../../dal/booksRepo.js')
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

router.get('/:id', async (req, res) => {
    const bookId = Number(req.params.id)

    const foundBook = await getBookById(bookId)

    res.json({
        book: foundBook
    })
})

module.exports = router
