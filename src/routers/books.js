const express = require('express')
const router = express.Router()
const getAllBooks = require('../repos/bookRepository')

router.get('/', async (req, res) => {

    const books = await getAllBooks()
    res.status(200).json({ books })
})

module.exports = router
