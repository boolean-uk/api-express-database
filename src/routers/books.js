const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
} = require("../../controllers/booksController");

router.get("/", (req, res) => {
  getAllBooks(req, res);
});

router.post("/", async (req, res) => {
  createBook(req, res);
});

router.get("/:id", async (req, res) => {
  getBookById(req, res);
});

router.put("/:id", async (req, res) => {
  updateBook(req, res);
});

router.delete("/:id", async (req, res) => {
  deleteBook(req, res);
});

module.exports = router;
