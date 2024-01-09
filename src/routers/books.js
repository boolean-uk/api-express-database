const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
    const books = await db.query("SELECT * FROM books");
    res.status(200).json({ books: books.rows });
});

router.post("/", async (req, res) => {
    const { title, type, author, topic, publication_date, pages } = req.body;

    const newBook = await db.query(
        "INSERT INTO books (title, type, author, topic, publication_date, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [title, type, author, topic, publication_date, pages]
    );

    return res.status(201).json({ book: newBook.rows[0] });
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const foundBook = await db.query('SELECT * FROM books WHERE id = $1', [id])

    return res.status(200).json({book: foundBook.rows[0]})
})


module.exports = router;
