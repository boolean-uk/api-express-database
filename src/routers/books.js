const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  let { type, topic, author, page, perPage } = req.query;
  let result;
  const query = [];
  const values = [];
  let index = 1;
  let myQuery = "";

  if (page === "" || page === undefined) {
    page = 1;
  }

  if (perPage === "" || perPage === undefined) {
    perPage = 20;
  }

  const pageNum = Number(page);
  const perPageNum = Number(perPage);
  const offset = (pageNum - 1) * perPageNum;

  if (type) {
    query.push(`type = $${index}`);
    values.push(type);
    index++;
  }
  if (topic) {
    query.push(`topic = $${index}`);
    values.push(topic);
    index++;
  }
  if (author) {
    query.push(`author = $${index}`);
    values.push(author);
    index++;
  }

  if (query.length > 0) {
    myQuery = "WHERE " + query.join(" AND ");
  }

  if (perPageNum > 50 || perPageNum < 10) {
    res.status(400).json({
      error: `parameter invalid perPage: ${perPageNum} not valid. Accepted range is 10 - 50`,
    });
  } else if (perPage || page) {
    result = await db.query(
      `SELECT * from books ${myQuery} LIMIT ${perPage} OFFSET ${offset}`,
      values
    );
    res.json({ books: result.rows, page: pageNum, per_page: perPageNum });
  } else {
    result = await db.query(`SELECT * from books ${myQuery}`, values);
    res.json({ books: result.rows });
  }
});

router.post("/", async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const result = await db.query(
    'INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    [title, type, author, topic, publicationDate, pages]
  );
  res.status(201).json({ book: result.rows[0] });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.query("SELECT * from books WHERE id = $1", [id]);
  if (result.rows.length === 0) {
    res.status(404).json({ error: `no book with id: ${id}` });
  } else {
    res.json({ book: result.rows[0] });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, type, author, topic, publicationDate, pages } = req.body;


  const seeTitle = await db.query(`SELECT * from books WHERE title = $1`, [
    title,
  ]);
  if (seeTitle.rows.length === 0 || seeTitle.rows[0].id === id) {
    const result = await db.query(
      'UPDATE books SET title = $2, type = $3, author = $4, topic = $5, "publicationDate" = $6, pages = $7 WHERE id = $1 RETURNING * ',
      [id, title, type, author, topic, publicationDate, pages]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: `no book with id: ${id}`,
      });
    }
    res.status(201).json({ book: result.rows[0] });
  }
 else{
    return res.status(409).json({
      error: `A book with the title: ${title} already exists`,
    });
  }

});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.query("DELETE FROM books WHERE id = $1 RETURNING *", [
    id,
  ]);
  if (result.rows.length === 0) {
    res.status(404).json({ error: `no book with id: ${id}` });
  } else {
    res.status(201).json({ book: result.rows[0] });
  }
});

module.exports = router;
