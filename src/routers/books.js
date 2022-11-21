const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const sqlQuery = `select * from books`;

  const result = await db.query(sqlQuery);

  res.json({
    books: result.rows,
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const sqlQuery = `select * from books where id = $1`;

  const result = await db.query(sqlQuery, [id]);

  res.json({
    books: result.rows,
  });
});

router.post("/", async (req, res) => {
  const newDate = new Date(req.body.publicationDate);
  const values = [
    req.body.title,
    req.body.type,
    req.body.author,
    req.body.topic,
    newDate,
    req.body.pages,
  ];
  const sqlQuery = `insert into books (title, type, author, topic, "publicationDate", pages) values ($1 , $2 , $3 , $4, $5, $6 ) returning *`;
  const result = await db.query(sqlQuery, values);
  res.json({ book: result.rows });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const newDate = new Date(req.body.publicationDate);
  const values = [
    req.body.title,
    req.body.type,
    req.body.author,
    req.body.topic,
    newDate,
    req.body.pages,
    id,
  ];
  const sqlQuery = `UPDATE books
    set  title = $1 ,  type = $2, author = $3, 
    topic = $4, "publicationDate" = $5, pages = $6
    where id = $7  RETURNING *`;

  const result = await db.query(sqlQuery, values);
  res.json({ book: result.rows });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const sqlQuery = `DELETE from books 
  WHERE id = $1 RETURNING *`

  const result = await db.query(sqlQuery, [id])
  res.json({ book: result.rows });
})

module.exports = router;
