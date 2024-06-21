const express = require('express')
const { getAllBooks } = require('../../dal/booksRepo.js')
const router = express.Router()

router.get('/', async (req, res) => {
    const type = req.query.type
    const topic = req.query.topic

    const books = await getAllBooks(type, topic)

    res.json({
        books
    })
})

module.exports = router
