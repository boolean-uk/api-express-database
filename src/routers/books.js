const express = require("express");
const router = express.Router();

const { getAllBooks } = require("../controllers/books");

router.get("/", async (req, res) => {
  const books = await getAllBooks();
  console.log('Books:', books);
  res.status(200).json({ books: books });
});
router.post("/", async (req, res) => {

});

module.exports = router;
