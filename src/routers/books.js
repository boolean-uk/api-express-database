const express = require("express");
const router = express.Router();
const db = require("../../db");

const { getBooks, createBook } = require('../controllers/books.js')

router.get("/", async (req, res) => {
    const books = await getBooks()
    res.status(200).json({ books: books });
});


router.post("/", async (req, res) => {
    const newBook = await createBook(req.body)

    res.status(201).json({ book: newBook });
});

router.get("/:id", async (req, res) => {
    const foundBook = await getBooks(req.params)
    res.status(200).json({ book: foundBook });
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, type, author, topic, publication_date, pages } = req.body;

    const updateBook = await db.query(
        "UPDATE books SET title = $2, type = $3, author = $4, topic = $5, publication_date = $6, pages = $7 WHERE id = $1 RETURNING *",
        [id, title, type, author, topic, publication_date, pages]
    );
    return res.status(201).json({ book: updateBook.rows[0] });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const deleteBook = await db.query('DELETE FROM books WHERE id = $1 RETURNING *', [id])

    res.status(201).json({book: deleteBook.rows[0]})
})





module.exports = router;
