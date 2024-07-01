const express = require('express')
const router = express.Router()
const db = require("../../db")
const dbClient = require('../../db')
const { book1, book2 } = require("../../test/fixtures/bookData.js")


router.post('/', async (req, res) => {
    const sqlQuery = `
    INSERT INTO books (title, type, author, topic, publication_date, pages)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `

    const values = [
        book1.title,
        book1.type,
        book1.author,
        book1.topic,
        book1.publication_date,
        book1.pages
    ]

    const result = await dbClient.query(sqlQuery, values)

    res.status(201).json({
        book: result.rows[0]
    })
})

router.get('/', async (req, res) => {
    const sqlQuery = 'select * from books'

    const result = await dbClient.query(sqlQuery)

    res.status(200).json({
        books: result.rows
    })
})

module.exports = router

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const sqlQuery = `select * from books where id = $1`

    const result = await dbClient.query(sqlQuery, [id])

    res.status(200).json({
        book: result.rows[0]
    })
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { title, type, author, topic, publication_date, pages } = req.body
    const sqlQuery = `
        update books
        set title = $1, type = $2, author = $3, topic = $4, publication_date = $5, pages = $6
        where id = $7
        RETURNING *
    `

    const values = [
        book2.title,
        book2.type,
        book2.author,
        book2.topic,
        book2.publication_date,
        book2.pages,
        id
    ]

    const result = await dbClient.query(sqlQuery, values)

    res.status(201).json({
        book: result.rows[0]
    })
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const sqlQuery = `
        delete from books
        where id = $1
        RETURNING *
    `

    const result = await dbClient.query(sqlQuery, [id])

    res.status(201).json({
        book: result.rows[0]
    })
})

module.exports = router
