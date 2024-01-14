const express = require("express");
const router = express.Router();

const { getAllBooks, postBookById } = require("../controllers/books");

router.get("/", async (req, res) => {
  const books = await getAllBooks();
  console.log('Books:', books);
  res.status(200).json({ books: books });
});
router.post('/', async (req, res) => {
  // [POST] localhost:3030/movies
  const book = await postBookById(req.body);
  res.status(201).json({ book: book })
})

module.exports = router;
