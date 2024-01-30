const express = require('express')
const router = express.Router()
const {getAllBooks,createBook,getBookById,updateBook,deleteBook} = require("../controllers/books")


router.get('/', async (req, res) => {
    const books = await getAllBooks(req.query)
    res.status(200).json({books})
})

router.post("/", async (req, res) => {
  const newBook = await createBook(req.body);
  res.status(201).json({ book: newBook });
});

router.get("/:id", async (req, res) => {
  const book = await getBookById(req.params.id);
  res.status(200).json({ book });
});

router.put("/:id", async (req, res) => {
  const updatedBook = await updateBook(req.params.id, req.body);
  res.status(201).json({ book: updatedBook });
});

router.delete("/:id", async (req, res) => {
  const deletedBook = await deleteBook(req.params.id);
  res.status(201).json({ book: deletedBook });
});



module.exports = router
