const express = require('express')
const router = express.Router()
const db = require("../../db");

// GET ALL BOOKS (INC. QUERY PARAMS)
router.get('/', async (req, res) => {
    const { type, topic } = req.query

    if (type && topic) {
        const books = await db.query(
            'SELECT * FROM books WHERE type = $1 AND topic = $2',
            [type, topic])
        return res.status(200).json({ books: books.rows })
    }

    if (type) {
        const books = await db.query(
            'SELECT * FROM books WHERE type = $1',
            [type])
        return res.status(200).json({ books: books.rows })
    }

    if (topic) {
        const books = await db.query(
            'SELECT * FROM books WHERE topic = $1',
            [topic]
        )
        return res.status(200).json({ books: books.rows })
    }

    const books = await db.query('SELECT * FROM books')
    return res.status(200).json({ books: books.rows })
})

module.exports = router
