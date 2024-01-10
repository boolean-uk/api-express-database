const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books.controller.js");

router.get("/", booksController.getAllBooks);
router.get("/", booksController.getBookById);

router.post("/", booksController.createBook);

module.exports = router;
