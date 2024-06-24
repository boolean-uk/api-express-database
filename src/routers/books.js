const express = require('express')
const { getAllBooks, createBook, getBookById, updateBook, deleteBookById } = require('../dal/booksRepo.js')
const router = express.Router()

router.get('/', async (req, res) => {
    const type = req.query.type
    const topic = req.query.topic
    const author = req.query.author
    const page = req.query.page
    const perPage = req.query.per_page

    const books = await getAllBooks(type, topic, author, page, perPage)

    res.json({
        books
    })
})

router.post('/', async (req, res) => {
    const book = req.body

    const newBook = await createBook(book)

    res.status(201).json({
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

router.put('/:id', async (req, res) => {
    const bookId = Number(req.params.id)
    const bookInfo = req.body

    const updatedBook = await updateBook(bookId, bookInfo)

    res.json({
        book: updatedBook
    })
})

router.delete('/:id', async (req, res) => {
    const bookId = Number(req.params.id)

    const deletedBook = await deleteBookById(bookId)

    res.json({
        book: deletedBook
    })
})

module.exports = router
