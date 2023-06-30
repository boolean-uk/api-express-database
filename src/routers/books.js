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


    const result = await db.query('INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [title, type, author, topic, publicationDate, pages])
   

    res.status(201).json({book: result.rows[0]})

})

// GET by id
router.get('/:id', async(req, res) => {
    const id = req.params.id
    const result = await db.query('SELECT * FROM books WHERE id = $1', [id])
    res.json({book: result.rows[0]})
})


// PUT by id
router.put('/:id', async(req, res) => {
    const {id} = req.params
    const {title, type, author, topic, publicationDate, pages} = req.body

    const result = await db.query('UPDATE books SET title = $2, type = $3, author = $4, topic = $5, "publicationDate" = $6, pages = $7 WHERE id = $1 RETURNING * ', [id, title, type, author, topic, publicationDate, pages])
    res.status(201).json({book: result.rows[0]})
})

//Delete a book by id

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await db.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
    res.status(201).json({book: result.rows[0]})
})


module.exports = router
