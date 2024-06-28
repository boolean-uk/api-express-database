const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  createNewBook,
  listBook,
  updateBook,
  deleteBook,
} = require("../../controllers/bookControllers.js");

router.get("/", getAllBooks);
router.get("/:id", listBook);
router.post("/", createNewBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
