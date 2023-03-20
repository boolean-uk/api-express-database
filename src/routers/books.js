const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  let str = `SELECT * FROM books `;
  const queries = req.query;
  if (queries.perPage === undefined) queries.perPage = 20;
  if (queries.page === undefined) queries.page = 1;
  queries.offset = queries.perPage * (queries.page - 1);
  const values = [Number(queries.perPage), queries.offset];

  if (queries.author !== undefined) {
    values.push(queries.author);
    str += `WHERE author = $3 `;
  }

  if (queries.perPage < 10 || queries.perPage > 50) {
    res.status(400).json({
      error: `parameter invalid perPage: ${queries.perPage} not valid. Accepted range is 10 - 50`,
    });
    return;
  }
  str += `LIMIT $1 OFFSET $2`;

  str += `;`;
  const data = await db.query(str, values);
  const resdata = { books: data.rows };
  if (queries.perPage || queries.page) {
    resdata.per_page = Number(queries.perPage);
    resdata.page = Number(queries.page);
  }
  res.json(resdata);
});

router.post("/", async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const str = `INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
  const values = [title, type, author, topic, publicationDate, pages];
  const data = await db.query(str, values);
  res.status(201).json({ book: data.rows[0] });
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const str = `SELECT * FROM books WHERE id = $1;`;
  const values = [id];
  const data = await db.query(str, values);
  if (data.rowCount === 0) {
    res.status(404).json({ error: `no book with id: ${req.params.id}` });
    return;
  }
  res.json({ book: data.rows[0] });
});

router.put("/:id", async (req, res) => {
  const checkStr = "SELECT * FROM books WHERE title = $1";
  const checkValues = [req.body.title];
  const check = await db.query(checkStr, checkValues);
  if (check.rows != 0) {
    res.status(409).json({
      error: `A book with the title: ${req.body.title} already exists`,
    });
    return;
  }
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const id = Number(req.params.id);
  const str = `UPDATE books SET title = $2, type = $3, author = $4, topic = $5, "publicationDate" = $6, pages = $7 WHERE id = $1 RETURNING *;`;
  const values = [id, title, type, author, topic, publicationDate, pages];
  const data = await db.query(str, values);
  if (data.rowCount === 0) {
    res.status(404).json({ error: `no book with id: ${req.params.id}` });
    return;
  }
  res.status(201).json({ book: data.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const str = `DELETE FROM books WHERE id = $1 RETURNING *;`;
  const values = [id];
  const data = await db.query(str, values);
  if (data.rowCount === 0) {
    res.status(404).json({ error: `no book with id: ${req.params.id}` });
    return;
  }
  res.status(201).json({ book: data.rows[0] });
});

module.exports = router;
