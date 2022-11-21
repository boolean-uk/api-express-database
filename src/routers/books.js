const express = require("express");
const router = express.Router();
const db = require("../../db");
const bookController = require("../controllers/books.controllers")
// GET
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);

// POST
router.post("/", bookController.addBook);

// PUT
router.put("/:id", bookController.updateBook);

// DELETE
router.delete("/:id", bookController.deleteBook);

module.exports = router;
