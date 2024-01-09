const express = require('express')
const router = express.Router()
const db = require("../../db");

router.get('/', async (req, res) => {
    const result = await db.query("SELECT * FROM books")
    return res.json({ books: result.rows })
})

module.exports = router
