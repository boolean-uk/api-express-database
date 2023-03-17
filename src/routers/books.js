const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get('/', async (req, res) => {
    const { type, topic } = req.query;

    let str = 'SELECT * FROM books';
    let values = [];

    if (type) {
        str += ' WHERE type = $1';
        values = [type];
    }
    if (topic) {
        str += ' WHERE topic = $1';
        values = [topic];
    }
    str += ';';
    const data = await db.query(str, values);
    const books = data.rows;
    res.json({ books });
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const str = 'SELECT * FROM books WHERE id = $1;';
    const values = [id];
    const data = await db.query(str, values);
    const book = data.rows[0];
    res.json({ book });
});

router.post('/', async (req, res) => {
    const { title, type, author, topic, publicationDate, pages } = req.body;
    const str =
        'INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';
    const values = [title, type, author, topic, publicationDate, pages];
    const data = await db.query(str, values);
    const book = data.rows[0];

    res.status(201).json({ book });
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { title, type, author, topic, publicationDate, pages } = req.body;
    const str =
        'UPDATE books SET title = $1, type = $2, author = $3, topic = $4, "publicationDate" = $5, pages = $6 WHERE id = $7 RETURNING *;';
    const values = [title, type, author, topic, publicationDate, pages, id];
    const data = await db.query(str, values);
    const book = data.rows[0];
    res.status(201).json({ book });
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const str = 'DELETE from books WHERE id = $1 RETURNING *;';
    const values = [id];
    const data = await db.query(str, values);
    const book = data.rows[0];
    res.status(201).json({ book });
});

module.exports = router;
