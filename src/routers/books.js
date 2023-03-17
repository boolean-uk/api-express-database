const express = require("express");
const router = express.Router();
const {
  getAll,
  createBook,
  getBook,
  update,
  deleted,
} = require("../controllers/books");

router.get("/", async (req, res) => {
  await getAll(req, res);
});

router.post("/", async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const str = ` ($1, $2, $3, $4, $5, $6)`;
  const values = [title, type, author, topic, publicationDate, pages];

  await createBook(req, res, str, values);
});

router.get("/:id", async (req, res) => {
  let str = "SELECT * FROM books";
  str += ` WHERE id = ${req.params.id};`;

  await getBook(req, res, str);
});

router.put("/:id", async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;
  let str = `title = $1, type = $2, author = $3,topic = $4, "publicationDate" = $5, pages =  $6`;
  str += ` WHERE id = ${req.params.id} `;
  const values = [title, type, author, topic, publicationDate, pages];

  await update(req, res, str, values);
});

router.delete("/:id", async (req, res) => {
  let str = ` WHERE id = ${req.params.id} `;

  await deleted(req, res, str);
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
