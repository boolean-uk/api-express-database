const express = require('express');
const router = express.Router();
const db = require('../../db');

const controller = require('../controllers/books.controller');

router.get('/', controller.getAllBooks);

router.get('/:id', controller.getBookById);

router.post('/', controller.postBook);

router.put('/:id', controller.updateBook);

router.delete('/:id', controller.deleteBook);

module.exports = router;
