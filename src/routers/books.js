const express = require('express')
const router = express.Router()
const dbConnection = require("../../utils/dbConnection.js")

router.get('/', async (req, res) => {
    const db = await dbConnection.connect()

    try {
        const sqlQuery = 'select * from books'
        const result = await db.query(sqlQuery)

        res.json({
            books: result.rows
        })
    } catch (error) {
        console.log(error)
    } finally {
        db.release()
    }
})

router.post('/', async (req, res) => {
    const db = await dbConnection.connect()
    const { title, type, author, topic, publication_date, pages } = req.body

    try {
        const sqlQuery = 'insert into books (title, type, author, topic, publication_date, pages) values ($1, $2, $3, $4, $5, $6) returning *'
        const result = await db.query(sqlQuery, [title, type, author, topic, publication_date, pages])

        res.status(201).json({
            book: result.rows[0]
        })
    } catch (error) {
        console.log(error)
    } finally {
        db.release()
    }
})

router.get('/:id', async (req, res) => {
    const db = await dbConnection.connect()
    const id = Number(req.params.id)

    try {
        const sqlQuery = 'select * from books where id = $1'
        const result = await db.query(sqlQuery, [id])

        res.json({
            book: result.rows[0]
        })
    } catch (error) {
        console.log(error)
    } finally {
        db.release()
    }
})

router.put('/:id', async (req, res) => {
    const db = await dbConnection.connect()
    const { title, type, author, topic, publication_date, pages } = req.body
    const id = Number(req.params.id)

    try {
        const sqlQuery = 'update books set title = $1, type = $2, author = $3, topic = $4, publication_date = $5, pages = $6 where id = $7 returning *'
        const result = await db.query(sqlQuery, [title, type, author, topic, publication_date, pages, id])

        res.status(201).json({
            book: result.rows[0]
        })
    } catch (error) {
        console.log(error)
    } finally {
        db.release()
    }
})

router.delete('/:id', async (req, res) => {
    const db = await dbConnection.connect()
    const id = Number(req.params.id)

    try {
        const sqlQuery = 'delete from books where id = $1 returning *'
        const result = await db.query(sqlQuery, [id])

        res.status(201).json({
            book: result.rows[0]
        })
    } catch (error) {
        console.log(error)
    } finally {
        db.release()
    }
})

module.exports = router
