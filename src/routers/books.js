const express = require("express");
const router = express.Router();
const db = require("../../db");
const { getAllBooks, addBook, getBookBy, deleteBook, editBook } = require("../controllers/books");

router.get("/", async (req, res) => {
  const result = await getAllBooks();
  res.json({ books: result.rows });
});

router.post("/", async (req, res) => {
  await addBook(req.body);
  const result = await getBookBy({ title: req.body.title });
  res.status(201).json({ book: result.rows[0] });
});

router.get("/:id", async (req, res) => {
  const result = await getBookBy(req.params);
  res.json({ book: result.rows[0] });
});

router.delete("/:id", async (req, res) => {
  const itemToDelete = await deleteBook(req.params)
  res.status(201).json({ book: itemToDelete.rows[0] });
});

router.put("/:id", async (req, res) => {
  await editBook(req.params, req.body)
  const result = await getBookBy(req.params);
  res.status(201).json({ book: result.rows[0] });
});

module.exports = router;
