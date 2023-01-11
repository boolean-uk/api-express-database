const express = require("express");
const router = express.Router();
const db = require("../../db");
const {
  create,
  getAll,
  getBookById,
  updateBookById,
  deleteBookById,
} = require("../controllers/books");

router.get("/", async (req, res) => {
  await getAll(req, res);
});

router.post("/", async (req, res) => {
  await create(req, res);
});

router.get("/:id", async (req, res) => {
  await getBookById(req, res);
});

router.put("/:id", async (req, res) => {
  await updateBookById(req, res);
});

router.delete("/:id", async (req, res) => {
  await deleteBookById(req, res)
});

module.exports = router;
