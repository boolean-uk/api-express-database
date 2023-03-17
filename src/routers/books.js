const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  const bookdata = await db.query("SELECT * FROM books;");

  res.json({ books: bookdata.rows });
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
