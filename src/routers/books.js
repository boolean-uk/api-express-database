const express = require("express");
const router = express.Router();
const db = require("../../db");

const {
    getBooks,
    getBookById,
    createBook,
    updateBookById,
    deleteBookById,
} = require("../controllers/books.js");

router.get("/", async (req, res) => {
    const books = await getBooks();
    res.status(200).json({ books: books });
});

router.post("/", async (req, res) => {
    const newBook = await createBook(req.body);
    res.status(201).json({ book: newBook });
});

router.get("/:id", async (req, res) => {
    const foundBook = await getBookById(req.params);
    res.status(200).json({ book: foundBook });
});

router.put("/:id", async (req, res) => {
    const updateBook = await updateBookById(req.params, req.body);
    return res.status(201).json({ book: updateBook });
});

router.delete("/:id", async (req, res) => {
    const deleteBook = await deleteBookById(req.params);
    res.status(201).json({ book: deleteBook });
});

module.exports = router;
