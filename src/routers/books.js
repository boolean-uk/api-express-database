const express = require('express')
const { getAllBooks, createBook, getBookByID, updateBook, deleteBook } = require('../controllers/books/index.js')
const router = express.Router()


router.get('/', async (req, res) => {
    let page = req.body.page
    let perPage = req.body.perPage

    if (
        page === undefined ||
        page === 0
        )
    {
        page = 1
    } 
    if (
        perPage === undefined ||
        perPage === 0) 
    {
        perPage = 20
    }
    if (
        perPage > 50
    ) {
        perPage = 50
    } else if (
        perPage < 10
    ) {
        perPage = 10
    }

    const books = await getAllBooks(req, page, perPage)


    res.status(200).json({
        books, 
        perPage: perPage,
        page: page
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
    const updatedBook = await updateBook(req)

    res.status(201).json({
        book: updatedBook
    })
})

router.delete('/:id', async(req, res) => {
    const deletedBook = await deleteBook(req)

    res.status(201).json({
        book: deletedBook
    })
})
module.exports = router
