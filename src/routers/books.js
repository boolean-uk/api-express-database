const express = require('express')
const router = express.Router()
const db = require("../../db");
const { parseISO, format } = require('date-fns');
const { utcToZonedTime } = require('date-fns-tz');

router.get('/', async (req, res) => {
    const queryOptions = []
    const queryParams = []
    const type = req.query.type
    const topic = req.query.topic
    if(type !== undefined){
        queryOptions.push(`LOWER(type) = $1`)
        queryParams.push(type)
    }
    if(topic !== undefined){
        queryOptions.push(`LOWER(topic) = $${queryOptions.length + 1}`)
        queryParams.push(topic)
    }
    console.log("query:", `select * FROM books ${queryOptions.length > 0 ? "WHERE " : ""}${queryOptions.join(" AND ")}`, queryParams)
    const response = await db.query(`select * FROM books ${queryOptions.length > 0 ? "WHERE " : ""}${queryOptions.join(" AND ")}`, queryParams)
    res.json({books: response.rows.map(parseBook)})
})
router.get('/:id', async (req, res) => {
    const response = await db.query("select * FROM books WHERE id = $1 ", [req.params.id])
    res.json({book: parseBook(response.rows[0])})
})
router.put('/:id', async (req, res) => {
    console.log("BumbaClap", req.body)
    const update = await db.query(
        `UPDATE books
            SET title = $1,
            type = $2,
            author = $3,
            topic = $4,
            publication_date = $5,
            pages = $6
            WHERE id = $7;
`, [req.body.title, req.body.type, req.body.author, req.body.topic, req.body.publication_date, req.body.pages, req.params.id ])
    const response = await db.query("select * FROM books WHERE id = $1 ", [req.params.id])
    res.status(201).json({book: parseBook(response.rows[0])})
})
router.delete('/:id', async (req, res) => {
    const response = await db.query("select * FROM books WHERE id = $1 ", [req.params.id])
    await db.query("DELETE FROM books WHERE id = $1", [req.params.id])
    res.status(201).json({book: parseBook(response.rows[0])})
})
router.post('/', async (req, res) => {
    console.log("BumbaClap", req.body)
    const update = await db.query(
        `INSERT INTO books (title, type, author, topic, publication_date, pages)
VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
`, [req.body.title, req.body.type, req.body.author, req.body.topic, req.body.publication_date, req.body.pages])
    console.log("test", update.rows[0])
const response = await db.query("select * FROM books WHERE id = $1 ", [update.rows[0].id])
    res.status(201).json({book: parseBook(response.rows[0])})
})

function parseBook(bookData) {
// // Parse the input date string to a Date object
// const date = parseISO(bookData.publication_date);

// // Convert the date to the local time zone
// const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// const zonedDate = utcToZonedTime(date, timeZone);

// Format the date to 'yyyy-MM-dd HH:mm:ss'
const outputDateStr = format(new Date(bookData.publication_date), 'yyyy-MM-dd HH:mm:ss');
return {...bookData, publication_date:outputDateStr}
}

module.exports = router
