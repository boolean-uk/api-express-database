const express = require('express')
const router = express.Router()

const { addBookController, getAllBooksController, getBookByIdController, putBookByIdController } = require('../controllers/booksControllers')

router.get('/', getAllBooksController)

router.post('/', addBookController)

router.get('/:id', getBookByIdController)

router.put('/:id', putBookByIdController)

module.exports = router
