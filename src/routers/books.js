const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  createBook,
  getBookById,
  updateBook, 
  deleteBook
} = require("../controllers/books.controller");

router.get("/", async (req, res) => {
  const books = await getAllBooks();
  // console.log(books)
  res.status(200).json({
    books,
  });
});

router.post("/", async (req, res) => {
  const book = req.body;

  const newBook = await createBook(book);

  res.status(201).json({
    book: newBook,
  });
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const selectedBook = await getBookById(id);

  res.status(200).json({
    book: selectedBook,
  });
});

router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const bookInfo = req.body;


    const bookToUpdate = await updateBook(id, bookInfo);

    res.status(201).json({
      book: bookToUpdate,
    });
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const bookToDelete = await deleteBook(id);
  res.status(201).json({
    book: bookToDelete
  });
});


module.exports = router;
