const booksRepository = require("../repositories/books_repository.js");

const getAllBooks = async (req, res) => {
  const { title, author } = req.query;
  try {
    const books = await booksRepository.getAllBooks(title, author);
    res.json({ books });
  } catch (error) {
    res.status(500).json({ error: "An error occured" });
  }
};

module.exports = {
  getAllBooks,
};
