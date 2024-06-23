const express = require('express')
const router = express.Router()

const { addBookController, getAllBooksController, getBookByIdController, putBookByIdController, deleteBookByIdController } = require('../controllers/booksControllers')

router.get('/', getAllBooksController)

router.post('/', addBookController)

router.get('/:id', getBookByIdController)

router.put('/:id', putBookByIdController)

router.delete('/:id', deleteBookByIdController)

module.exports = router
