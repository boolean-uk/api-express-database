require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    user: PGUSER, 
    password: PGPASSWORD,
    port: 5432,
    ssl: {
        require: true,
    },
});

const router = express.Router();

router.get('/', async (req, res) => {
    const db = await pool.connect(); 
    const sqlQuery = 'SELECT * FROM books'; 
    const result = await db.query(sqlQuery);

    res.json({ 
        books: result.rows
    });
    db.release();
});

router.post('/', async (req, res) => {
    const { title, type, author, topic, publication_date, pages } = req.body;
    const db = await pool.connect();
    const sqlQuery = 'INSERT INTO books (title, type, author, topic, publication_date, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const result = await db.query(sqlQuery, [title, type, author, topic, publication_date, pages]);
    res.status(201).json({ book: result.rows[0] });
    db.release();
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await pool.connect();
    const sqlQuery = 'SELECT * FROM books WHERE id = $1';
    const result = await db.query(sqlQuery, [id]);
    
    if (result.rows.length > 0) {
        res.json({ book: result.rows[0] });
    } else {
        res.status(404).json({ error: 'Book not found' });
    }

    db.release();
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, type, author, topic, publication_date, pages } = req.body;
    const db = await pool.connect();
    const sqlQuery = `
        UPDATE books 
        SET title = $1, type = $2, author = $3, topic = $4, publication_date = $5, pages = $6
        WHERE id = $7
        RETURNING *
    `;
    const result = await db.query(sqlQuery, [title, type, author, topic, publication_date, pages, id]);

    if (result.rows.length > 0) {
        res.json({ book: result.rows[0] });
    } else {
        res.status(404).json({ error: 'Book not found' });
    }

    db.release();
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await pool.connect();
    const sqlQuery = 'DELETE FROM books WHERE id = $1 RETURNING *';
    const result = await db.query(sqlQuery, [id]);

    if (result.rows.length > 0) {
        res.json({ message: 'Book deleted successfully' });
    } else {
        res.status(404).json({ error: 'Book not found' });
    }

    db.release();
});


module.exports = router;
