const express = require("express");
const router = express.Router();
const { getAllBooks, addBook, getBookBy, deleteBook, editBook } = require("../controllers/books");
const booksControllers = require("../controllers/books")

router.get("/",  booksControllers.getAllBooks);

router.post("/", booksControllers.addBook)

router.get("/:id", booksControllers.getBookBy);

router.delete("/:id", booksControllers.deleteBook);

router.put("/:id", booksControllers.editBook);

module.exports = router;
