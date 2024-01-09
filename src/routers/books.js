const express = require("express");
const router = express.Router();
const db = require("../../db");

const allBooks = "SELECT * FROM books";

router.get("/", async (req, res) => {
  const { type, topic } = req.query;

  if (type && topic) {
    const booksByTypeAndTopic = await db.query(
      `${allBooks} WHERE type = $1 AND topic = $2`,
      [type, topic]
    );

    return res.status(200).send({ books: booksByTypeAndTopic.rows });
  }

  if (type) {
    const booksByType = await db.query(`${allBooks} WHERE type = $1`, [type]);
    return res.status(200).send({ books: booksByType.rows });
  }

  if (topic) {
    const booksByTopic = await db.query(`${allBooks} WHERE topic = $1`, [
      topic,
    ]);
    return res.status(200).send({ books: booksByTopic.rows });
  }

  const books = await db.query(allBooks);
  return res.status(200).send({ books: books.rows });
});

router.post("/", async (req, res) => {
  const { title, type, author, topic, publication_date, pages } = req.body;

  const newBook = await db.query(
    "INSERT INTO books(title, type, author, topic, publication_date, pages) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
    [title, type, author, topic, publication_date, pages]
  );

  return res.status(201).send({ book: newBook.rows[0] });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const bookById = await db.query(`${allBooks} WHERE id = $1`, [id]);

  if (bookById.rows.length > 0) {
    return res.status(200).send({ book: bookById.rows[0] });
  }

  return res.status(404).send({ error: "No book found with given ID" });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, type, author, topic, publication_date, pages } = req.body;

  const updatedBook = await db.query(
    "UPDATE books SET title = $1, type = $2, author = $3, topic = $4, publication_date = $5, pages = $6 WHERE id = $7 RETURNING * ",
    [title, type, author, topic, publication_date, pages, id]
  );

  return res.status(201).send({ book: updatedBook.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const deletedBook = await db.query(
    "DELETE FROM books WHERE id = $1 RETURNING *",
    [id]
  );

  return res.status(201).send({ book: deletedBook.rows[0] });
});

module.exports = router;
