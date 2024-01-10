const express = require('express')
const router = express.Router()
const db = require("../../db");

// GET ALL BOOKS (INC. QUERY PARAMS)
router.get('/', async (req, res) => {
    const { type, topic, author, page, perPage } = req.query

    let select_query = 'SELECT * FROM books'
    let books
    if (type) {
        books = await db.query(
            select_query.concat(' WHERE type = $1'),
            [type])
    }

    if (topic) {
        books = await db.query(
            select_query.concat(' WHERE topic = $1'),
            [topic]
        )
    }

    if (!type && !topic) {
        books = await db.query(select_query)
    }

    // EXTENSION SEPARATION
    let pageQuery = Number(page) || 1
    let per_page = Number(perPage) || 20

    if (perPage < 10 || perPage > 50) {
        return res.status(400).json({ error: `parameter invalid perPage: ${perPage} not valid. Accepted range is 10 - 50` })
    }
    if (!perPage && !page) {
        books = await db.query(
            select_query.concat(' LIMIT $1'),
            [per_page])
    }
    if (perPage && !page) {
        books = await db.query(
            select_query.concat(' LIMIT $1'),
            [per_page])
    }
    if (!perPage && page) {
        books = await db.query(
            select_query.concat(' LIMIT $1 OFFSET $2'),
            [per_page, per_page * (pageQuery -1)])
    }
    if (perPage && page) {
        books = await db.query(
            select_query.concat(' LIMIT $1 OFFSET $2'),
            [per_page, per_page * (pageQuery -1)])
    }

    if (author) {
        books = await db.query(
            select_query.concat(' WHERE author = $1'),
            [author])
    }
    return res.status(200).json({ books: books.rows, per_page: per_page, page: pageQuery })
})

// CREATE A BOOK
router.post('/', async (req, res) =>{
    const { title, type, author, topic, publication_date, pages } = req.body
    const newBook = await db.query(
        'INSERT INTO books (title, type, author, topic, publication_date, pages) VALUES ( $1, $2, $3, $4, $5, $6) RETURNING *',
        [title, type, author, topic, publication_date, pages]
    )
    return res.status(201).json({ book: newBook.rows[0] })
})


// GET A BOOK BY ID
router.get('/:id', async (req, res) => {
    const { id } = req.params

    const foundBook = await db.query(
        'SELECT * FROM books WHERE id = $1', 
        [id]
    )

    return res.status(200).json({ book: foundBook.rows[0] })
})

// UPDATE A BOOK (BY ID)
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { title, type, author, topic, publication_date, pages } = req.body
    const updatedBook = await db.query(
        'UPDATE books SET title = $2, type = $3, author = $4, topic = $5, publication_date = $6, pages = $7 WHERE id = $1 RETURNING *',
        [id, title, type, author, topic, publication_date, pages]
    )
    return res.status(201).json({ book: updatedBook.rows[0] })
})

// DELETE A BOOK (BY ID)
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const deletedBook = await db.query(
        'DELETE FROM books WHERE id = $1 RETURNING *',
        [id]
    )
    return res.status(201).json({ book: deletedBook.rows[0]})
})

module.exports = router
