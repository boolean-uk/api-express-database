const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
    const sqlQuery = `select * from books`

    const result = await db.query(sqlQuery)

    res.json({
        books: result.rows
    })
})

router.post('/', async (req, res) => {
    const sqlQuery = `INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
    const newDate = new Date(req.body.publicationDate)
    const result = await db.query(sqlQuery, [req.body.title, req.body.type, req.body.author, req.body.topic, newDate, req.body.pages])
    console.log(result)
    res.json({
        book: result.rows
    })
})

router.get('/:id', async (req, res) => {
    const sqlQuery = `select * from books where id = $1`
    const result = await db.query(sqlQuery, [req.params.id])
    console.log(result)
    res.json({
        book: result.rows
    })
})



module.exports = router
