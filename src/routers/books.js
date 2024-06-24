const express = require("express")
const router = express.Router()
const {
  getBooks,
  postBook,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/booksControllers.js")

router.get("/", getBooks)
router.post("/", postBook)
router.get("/:id", getBook)
router.put("/:id", updateBook)
router.delete("/:id", deleteBook)

module.exports = router
