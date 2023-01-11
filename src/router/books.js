const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  create,
  update,
  deleteBook,
} = require("../controllers/books.js");

// GET all
router.get("/", async (req, res) => {
  await getAll(req, res);
});

// GET one by ID
router.get("/:id", async (req, res) => {
  await getById(req, res);
});

// POST create a book
router.post("/", async (req, res) => {
  await create(req, res);
});

// UPDATE a book
router.put("/:id", async (req, res) => {
  await update(req, res);
});

// Delete
router.delete("/:id", async (req, res) => {
  await deleteBook(req, res);
});

module.exports = router;
