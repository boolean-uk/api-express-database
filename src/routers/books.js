const express = require("express");
const router = express.Router();

const { fetchAllBooks } = require("../controllers/books");

// GET route for retrieving all books from the database
router.get("/", async (req, res) => {
  const books = await fetchAllBooks(req.query);
  return res.json({ books });
});

module.exports = router;
