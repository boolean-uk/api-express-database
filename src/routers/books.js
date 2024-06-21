const express = require('express')
const { getAllBooks, createBook, getBookByID, updateBook } = require('../controllers/books/index.js')
const router = express.Router()


router.get('/', async (req, res) => {
    const books = await getAllBooks()

    res.status(200).json({
        books
    })
})

router.post('/', async (req, res) => {

    const newBook = await createBook(req)
    res.status(201).json({
        book: newBook
    })
})

router.get('/:id', async (req, res) => {
    const book = await getBookByID(req)

    res.status(200).json({
        book: book
    })
})


router.put('/:id', async(req, res) => {
    const book = await updateBook(req)

    res.status(201).json({
        book: book
    })
})
module.exports = router
