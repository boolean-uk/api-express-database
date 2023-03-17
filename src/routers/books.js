const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
    const type = req.query.type

    let str = 'SELECT * FROM books'
    let values = []
    if (type) {
        str += ' WHERE type = $1' // if using interpolation instead there is a possibility injecting SQL -> 'intentionally' drop table?
        values = [type]
    }
    str += ';'

    const data = await db.query(str, values)
    const books = data.rows
    res.json({ books })
})

module.exports = router
