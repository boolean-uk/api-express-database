const express = require("express");
const router = express.Router();

const { getAllBooks, postBookById, getABookById, updateBookById } = require("../controllers/books");

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
router.get("/:id", async (req, res) => {
  const bookId = req.params.id;
  const book = await getABookById(bookId);
  res.status(200).json({ book: book })

})
router.put('/:id', async (req, res) => {
  const updatedBook = await updateBookById(req.params.id, req.body);
  res.json({ book: updatedBook })
})
module.exports = router;
