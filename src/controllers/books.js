const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBookById,
  getBookByTitle,
} = require("../repositories/book");

const getAll = async (req, res) => {
  const { author, page, per_page } = req.query;
  const books = await getAllBooks(author, page, per_page);
  res.json({ books: books });
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await getBookById(id);

    if (book.length === 0) {
      // If the DB returns no data (i.e. it is `undefined`), we return a custom error message
      res.status(404).json({ error: `Book with ID ${id} not found` });
    } else {
      res.json({ book: book });
    }
  } catch (error) {
    // If there is some other error that occurs with the request, we return the built-in error messsage
    res.status(500).json({ error: error.message });
  }
};
const create = async (req, res) => {
  // Ensure the order of the values is:
  // title, director, release_year, duration_mins
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const values = [title, type, author, topic, publicationDate, pages];

  try {
    const book = await createBook(values);

    if (!book) {
      res.status(400).json({
        error: "Failed to create book with the values provided.",
        body: req.body,
      });
    } else {
      res.status(201).json({ book: book });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title, type, author, topic, publicationDate, pages } = req.body;
  const values = [title, type, author, topic, publicationDate, pages];

  const foundId = await getBookById(id);
  if (foundId.length === 0) {
    // ID DOES NOT EXIST
    res.status(404).json({
      error: "A book with the provided ID was not found",
    });
    return;
  }
  const foundTitle = await getBookByTitle(title);
  if (foundTitle) {
    // TITLE ALREADY EXISTS
    res
      .status(409)
      .json({ error: "A book with the provided title already exists" });
  }

  const book = await updateBook(id, values);
  res.status(201).json({ book: book });
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  const book = await deleteBookById(id);
  // const book = await db.query(`DELETE FROM books WHERE id = ${id}
  // RETURNING *`);
  res.status(201).json({ book: book });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteBook,
};
