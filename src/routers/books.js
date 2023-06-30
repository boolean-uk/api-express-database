const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
    const type = req.query.type
    const result = await db.query('SELECT * FROM books WHERE type ILIKE $1',[type]);
    res.json({ books:result.rows })

})

router.post('/', async (req, res) => {
    const { title, type, author, topic, publicationDate, pages } = req.body;
    const result = await db.query('INSERT INTO books (title, type, author, topic, publicationDate, pages)' + 
    'VALUES ($1, $2, $3, $4, $5, $6)' +
    'RETURNING *', [title, type, author, topic, publicationDate, pages]);
    res.json( { book: result.rows[1]} );
 
})

module.exports = router
