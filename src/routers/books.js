const express = require("express");
const router = express.Router();
const db = require("../../db/index");

// Retrieve all books
// URL FORMAT: http://localhost:3030/books?per_page=51&page=2
router.get("/", async (req, res) => {
  let { author, page, perPage } = req.query;
  page = Number(page) || 1;
  perPage = Number(perPage) || 20;

  if (perPage < 10 || perPage > 50) {
    return res.status(400).json({
      error: `parameter invalid perPage: ${perPage} not valid. Accepted range is 10 - 50`,
    });
  }

  const per_page_offset = (page - 1) * perPage;

  let dbquery;
  let result;

  if (author) {
    dbquery = `SELECT * FROM books WHERE author = $1 LIMIT $2 OFFSET $3`;
    result = await db.query(dbquery, [author, perPage, per_page_offset]);
  } else {
    dbquery = `SELECT * FROM books LIMIT $1 OFFSET $2`;
    result = await db.query(dbquery, [perPage, per_page_offset]);
  }

  if (result) {
    res.json({
      books: result.rows,
      per_page: perPage,
      page: page,
    });
  } else {
    res.send("No books exist");
  }
});

// Get a book by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.query(`SELECT * FROM books WHERE id = $1`, [id]);
  if (result.rows.length) {
    res.json({ book: result.rows[0] });
  } else {
    res.status(404).send({ error: `no book with id: ${id}` });
  }
});

// Create a book
router.post("/", async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const result = await db.query(
    `INSERT INTO books (title, type, author, topic, "publicationDate", pages)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
    [title, type, author, topic, publicationDate, pages]
  );
  // res.status(201).json({ book: result.rows[0] });

  if (result.rows.length) {
    res.status(201).json({ book: result.rows[0] });
  } else {
    res.status(404).send({ error: `no book with id: ${id}` });
  }
});

// Update a book
router.put("/:id", async (req, res) => {
  const currentTitle = await db.query(`SELECT * FROM books WHERE title = $1`, [
    req.body.title,
  ]);

  console.log("qqq", currentTitle.rows);

  if (currentTitle.rows.length !== 0) {
    res.status(409).send({
      error: `A book with the title: ${req.body.title} already exists`,
    });
    return;
  }

  const id = Number(req.params.id);
  const { title, type, author, topic, publicationDate, pages } = req.body;

  console.log("currentTitle", currentTitle.rows);

  const result = await db.query(
    `
    UPDATE books
    SET title = $2, type = $3, author = $4, topic = $5, "publicationDate" = $6, pages = $7
    WHERE id = $1
    RETURNING *`,
    [id, title, type, author, topic, publicationDate, pages]
  );

  if (result.rows.length) {
    res.status(201).json({ book: result.rows[0] });
  } else {
    res.status(404).send({ error: `no book with id: ${id}` });
  }
});

// Delete a book
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.query(
    `
  DELETE FROM books
  WHERE id = $1
  RETURNING *`,
    [id]
  );

  if (result.rows.length) {
    res.status(201).json({ book: result.rows[0] });
  } else {
    res.status(404).send({ error: `no book with id: ${id}` });
  }
});

module.exports = router;
