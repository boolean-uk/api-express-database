const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
    const books = await db.query("SELECT * FROM books");
    res.status(200).json({ books: books.rows });
});

const SqlBookKeys = 'title, type, author, topic, publication_date, pages'

router.post("/", async (req, res) => {
    const { title, type, author, topic, publication_date, pages } = req.body;

    const newBook = await db.query(
        `INSERT INTO books (${SqlBookKeys}) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [title, type, author, topic, publication_date, pages]
    );

    return res.status(201).json({ book: newBook.rows[0] });
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const foundBook = await db.query('SELECT * FROM books WHERE id = $1', [id])

    return res.status(200).json({book: foundBook.rows[0]})
})

router.put('/:id', async(req,res) => {
    const {id} = req.params;
    const { title, type, author, topic, publication_date, pages } = req.body

    const updateBook = await db.query('UPDATE books SET title = $2, type = $3, author = $4, topic = $5, publication_date = $6, pages = $7 WHERE id = $1 RETURNING *', [id, title, type, author, topic, publication_date, pages ])
    return res.status(201).json({book: updateBook.rows[0]})
})




module.exports = router;
