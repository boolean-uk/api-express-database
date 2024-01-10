const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books.controller.js");

router.get("/", booksController.getAllBooks);

module.exports = router;
