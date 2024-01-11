const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
    const books = await db.query('SELECT * FROM books')
    res.json({ books: books.rows})

})

module.exports = router
