const express = require('express')
const router = express.Router()
const { getAllBooks, createBook, getBookById, updateBook, deleteBook } = require('../functions/logicBooks.js')

router.get('/', async (req, res) => {
    const books = await getAllBooks()
    // console.log(books)
    res.status(200).json({
        books
    })
})

router.post('/', async (req, res) => {
    // console.log(req.body)
    const book = await createBook(req.body)

    res.status(201).json({
        book
    })
})

router.get('/:id', async (req, res) => {
    const book = await getBookById(req.params.id)

    res.json({
        book
    })
})

router.put('/:id', async (req, res) => {
    const book = await updateBook(req.params.id, req.body)

    res.status(201).json({
        book
    })
})

router.delete('/:id', async (req, res) => {
    const book = await deleteBook(req.params.id)

    res.status(201).json({
        book
    })
})

module.exports = router
