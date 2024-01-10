const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  updateBook,
} = require("../controllers/books");

router.get("/", async (req, res) => {
  const books = await getAllBooks(req.query);
  return res.status(200).send({ books: books });
});

router.post("/", async (req, res) => {
  const newBook = await createBook(req.body);

  return res.status(201).send({ book: newBook });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const bookById = await getBookById(id);

  if (!bookById) {
    return res.status(404).send({ error: "No book found with given ID" });
  }

  return res.status(200).send({ book: bookById });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const updatedBook = await updateBook(id, req.body);

  return res.status(201).send({ book: updatedBook });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const deletedBook = await deleteBook(id);

  return res.status(201).send({ book: deletedBook });
});

module.exports = router;
