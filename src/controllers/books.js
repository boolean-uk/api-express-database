const pool = require('../../db')
const booksRepository = require('../repositories/booksRepository')

const types = new Map([['Fiction', "type = 'Fiction'"], ['Non-Fiction', "type = 'Non-Fiction'"]])

const getBooks = async (req, res) => {

    const result = await booksRepository.getBooks(req)

    res.send({ books: result.rows })
}

const createBook = async (req, res) => {
    const db = await pool.connect()

    const { title, type, author, topic, publication_date, pages } = req.body

    if (
        !title ||
        !type ||
        !author ||
        !topic ||
        !publication_date ||
        !Number.isInteger(pages)
    ) {
        res.status(400).json({
            error: 'All fields are required and pages must be an integer.',
        })
    }

    const result = await booksRepository.createBook(req)

    res.status(201).json({ book: result.rows[0] })
}

const getBookById = async (req, res) => {
    const result = await booksRepository.getBookById(req)

    res.send({ book: result.rows[0] })
}

const updateBookById = async (req, res) => {
    const { title, type, author, topic, publication_date, pages } = req.body

    if (
        !title ||
        !type ||
        !author ||
        !topic ||
        !publication_date ||
        !Number.isInteger(pages)
    ) {
        return res.status(400).json({
            error: 'All fields are required and pages must be an integer.',
        })
    }
        const result = await booksRepository.updateBookById(req)
        return res.status(201).json({ book: result.rows[0] })

}

const deleteBookById = async (req, res) => {

    const result = await booksRepository.deleteBookById(req)

    res.status(201).send({ book: result.rows[0] })
}

module.exports = {
    getBooks,
    createBook,
    getBookById,
    deleteBookById,
    updateBookById,
}
