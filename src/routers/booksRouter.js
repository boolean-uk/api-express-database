const express = require("express");
const router = express.Router();
const controller = require("../controllers/booksController.js");

router.route("/").get(controller.getAllBooks).post(controller.addBook);
router
  .route("/:id")
  .get(controller.getBook)
  .delete(controller.deleteBook)
  .put(controller.updateBook);

module.exports = router;
