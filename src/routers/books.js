const express = require("express");
const router = express.Router();
const db = require("../../db");
const { off } = require("../server");

// GET books
router.get("/", async (req, res) => {
  let { type, topic, author, page, perPage } = req.query;
  const parameters = [];
  const valuesArray = [];
  let index = 1;

  if (page === undefined || page === "") {
    page = 1;
  }

  if (perPage === undefined || perPage === "") {
    perPage = 20;
  }

  const parsedPage = Number(page);
  const parsedPerPage = Number(perPage);

  const offset = (parsedPage - 1) * parsedPerPage;

  if (parsedPerPage > 50 || parsedPerPage < 10) {
    return res.status(400).json({
      error: `parameter invalid perPage: ${perPage} not valid. Accepted range is 10 - 50`,
    });
  }

  if (type) {
    parameters.push("type = $1");
    valuesArray.push(type);
    index++;
  }

  if (topic) {
    parameters.push("topic = $" + index);
    valuesArray.push(topic);
    index++;
  }

  if (author) {
    parameters.push("author = $" + index);
    valuesArray.push(author);
    index++;
  }

  let whereForQuery = "";
  if (parameters.length > 0) {
    whereForQuery = "WHERE " + parameters.join(" AND ");
  }

  const myQuery = `SELECT * from books ${whereForQuery} LIMIT $${
    valuesArray.length + 1
  } OFFSET $${valuesArray.length + 2}`;
  valuesArray.push(parsedPerPage, offset);

  const result = await db.query(myQuery, valuesArray);
  dataForRes = { books: result.rows };
  if (perPage || page) {
    dataForRes.per_page = parsedPerPage;
    dataForRes.page = parsedPage;
  }
  res.json(dataForRes);
});

// POST books
router.post("/", async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;

  const result = await db.query(
    'INSERT INTO books (title, type, author, topic, "publicationDate", pages) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    [title, type, author, topic, publicationDate, pages]
  );

  res.status(201).json({ book: result.rows[0] });
});

// GET by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
  if (result.rows[0] === undefined) {
    return res.status(404).json({
      error: `no book with id: ${id}`,
    });
  }
  res.json({ book: result.rows[0] });
});

// PUT by id
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

//Delete a book by id

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.query("DELETE FROM books WHERE id = $1 RETURNING *", [
    id,
  ]);
  if (result.rows[0] === undefined) {
    return res.status(404).json({
      error: `no book with id: ${id}`,
    });
  }
  res.status(201).json({ book: result.rows[0] });
});

module.exports = router;
