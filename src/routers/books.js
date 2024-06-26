const express = require("express");
const router = express.Router();
const db = require("../data/books.js");

router.get("/", async (req, res) => {
  const books = await db.all();
  res.status(200).json({ books: books });
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const book = await db.getById(id);
  res.status(200).json({ book: book });
});

router.post("/", async (req, res) => {
  const newBook = req.body;
  if (!newBook.title || !newBook.author || !newBook.type) {
    res.status(400).send({ error: `Missing fields in request body` });
    return;
  }

  const book = await db.create(newBook);
  res.status(201).json({ book: book });
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const updates = req.body;

  if (!updates.title || !updates.author || !updates.type) {
    res.status(400).send({ error: `Missing fields in request body` });
    return;
  }

  const updated = db.update(updates);
  res.status(201).json({ book: updated });
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const result = await db.remove(id);
  res.status(201).json({ book: result });
});

module.exports = router;
