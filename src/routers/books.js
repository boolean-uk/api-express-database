const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const bookdata = await db.query("SELECT * FROM books;");

  res.json({ books: bookdata.rows });
});

router.post("/", async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;

  const str = ` ('${title}', '${type}', '${author}','${topic}', '${publicationDate}', ${pages})`;

  const bookdata = await db.query(
    'INSERT INTO books ( title, type, author, topic, "publicationDate", pages) VALUES' +
      str +
      "RETURNING *;"
  );

  res.status(201).json({ book: bookdata.rows[0] });
});

// router.get("/", async (req, res) => {
//   const topic = req.query.topic;
//   const values = [];

//   let str = "SELECT * FROM books";

//   if (topic) {
//     str += " WHERE topic = $1";
//     values.push(topic);
//   }
//   str += ";";

//   const bookdata = await db.query(str, values);
//   const books = bookdata.rows;

//   res.json({ books });
// });

module.exports = router;
