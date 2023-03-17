const express = require('express')
const router = express.Router()
const db = require('../../db');




router.get('/', async (req, res) => {
    //get all books
    //query the DB using a SELECT


    const str = 'SELECT * FROM books;'
    const values = []
    const data = await db.query(str, values)
    console.log(data)
    const books = data.rows

    res.json({ books })
})



router.post('/', async (req, res) => {
    const { title, type, author, topic, publicationDate, pages } = req.body

    const str = 'INSERT INTO books (title, type, author, topic, "publicationDate", pages ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';
    const values = [title, type, author, topic, publicationDate, pages]

    const data = await db.query(str, values)
    res.status(201).json({ book: data.rows[0] });
})


router.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const str = 'SELECT * FROM books WHERE id = $1;'
    const values = [id]
    const data = await db.query(str, values)
    res.json({ book: data.rows[0] })
})

router.put('/:id', async (req, res) => {
    const { title, type, author, topic, publicationDate, pages } = req.body
    const id = Number(req.params.id);
    const str = `UPDATE books SET title = $2, type = $3, author = $4, topic = $5, "publicationDate" = $6, pages = $7 WHERE id = $1 RETURNING *;`;
    const values = [id, title, type, author, topic, publicationDate, pages];
    const data = await db.query(str, values)
    res.status(201).json({ book: data.rows[0] })
})

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const str = 'DELETE FROM  books WHERE id = $1 RETURNING *;'
    const values = [id]
    const data = await db.query(str, values)
    res.status(201).json({ book: data.rows[0] })
})


module.exports = router;