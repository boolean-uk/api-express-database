const express = require('express');
const router = express.Router();
const db = require("../../db");
const { Pool } = require('pg');
require('dotenv').config(); // to load environment variables


const connectionString = process.env.PGURL;
const pool = new Pool({
  connectionString: connectionString,
});

router.get("/", async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM books');
      const books = result.rows;
      res.json(books);
    } catch (error) {
      console.error('Error retrieving books:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.get("/:id", async (req, res) => {
    const bookId = req.params.id;
    try {
      const result = await pool.query('SELECT * FROM books WHERE id = $1', [bookId]);
      const book = result.rows[0];
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      console.error(`Error retrieving book with id ${bookId}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  router.post("/", async (req, res) => {
    const { title, type, author, topic, publication_date, pages } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO books (title, type, author, topic, publication_date, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [title, type, author, topic, publication_date, pages]
      );
      const newBook = result.rows[0];
      res.status(201).json(newBook);
    } catch (error) {
      console.error('Error creating book:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.put("/:id", async (req, res) => {
    const bookId = req.params.id;
    const { title, type, author, topic, publication_date, pages } = req.body;
    try {
      const result = await pool.query(
        'UPDATE books SET title = $1, type = $2, author = $3, topic = $4, publication_date = $5, pages = $6 WHERE id = $7 RETURNING *',
        [title, type, author, topic, publication_date, pages, bookId]
      );
      const updatedBook = result.rows[0];
      if (updatedBook) {
        res.json(updatedBook);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      console.error(`Error updating book with id ${bookId}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  router.delete("/:id", async (req, res) => {
    const bookId = req.params.id;
    try {
      const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [bookId]);
      const deletedBook = result.rows[0];
      if (deletedBook) {
        res.json(deletedBook);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      console.error(`Error deleting book with id ${bookId}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
module.exports = router; 



