const express = require("express");
const router = express.Router();
const db = require("../../db");
const booksController = require("../contollers/books.js");

router.get("/", booksController.getBooks);

router.post("/", booksController.postBook);

router.get("/:id", booksController.getBookById);

router.put("/:id", booksController.updateBookById);

router.delete("/:id", booksController.deleteBookById);

module.exports = router;
