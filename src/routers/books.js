const express = require('express')
const router = express.Router()
const db = require("../../db");

// GET books
router.get('/', async (req, res) => {
    const result = await db.query('SELECT * FROM books')
    res.json({books: result.rows})
})


// POST books
router.post('/', async (req, res) => {
    const {title, type, author, topic, publicationDate, pages} = req.body


    const result = await db.query('INSERT INTO books (title, type, author, topic, "publicationDate", pages)' + 'VALUES($1, $2, $3, $4, $5, $6)' + 'RETURNING *', [title, type, author, topic, publicationDate, pages])
    // console.log('res', result)

    res.status(201).json({book: result.rows[0]})

})

module.exports = router
