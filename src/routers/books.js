const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const { type, topic } = req.query;
  let query = "SELECT * FROM books";
  const values = [];
  if (type && topic) {
    values.push(type, topic);
    query += " WHERE type = $1 AND topic = $2";
  } else if (type) {
    values.push(type);
    query += " WHERE type = $1";
  } else if (topic) {
    values.push(topic);
    query += " WHERE topic = $1";
  }
  try {
    const result = await db.query(query, values);
    res.json({ books: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch books from the database" });
  }
});

router.post("/", async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO books (title, type, author, topic, "publicationDate", pages)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [title, type, author, topic, publicationDate, pages]
    );
    res.status(201).json({ book: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to insert the book into the database" });
  }
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json({ book: result.rows[0] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch the book from the database" });
  }
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { title, type, author, topic, publicationDate, pages } = req.body;
  try {
    const result = await db.query(
      `UPDATE books
      SET title = $2, type = $3, author = $4, topic = $5, "publicationDate" = $6, pages = $7
      WHERE id = $1
      RETURNING *`,
      [id, title, type, author, topic, publicationDate, pages]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.status(201).json({ book: result.rows[0] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the book in the database" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await db.query("DELETE FROM books WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.status(201).json({ book: result.rows[0] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the book from the database" });
  }
});

module.exports = router;
