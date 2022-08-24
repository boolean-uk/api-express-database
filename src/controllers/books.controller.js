const { isObjEmpty } = require('../utils');
const model = require('../models/books.model');

const getAllBooks = async (req, res) => {
  try {
    const books = await model.getAllBooks(req);

    res.status(200).json({
      books,
    });
  } catch (error) {
    console.error('[ERROR]', error);
    res.sendStatus(500);
  }
};

const getBookById = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await model.getBookById(bookId);

    if (isObjEmpty(book)) {
      return res
        .status(404)
        .json({ error: 'A book with the provided ID does not exist' });
    }

    res.status(200).json({ book });
  } catch (error) {
    console.error('[ERROR]', error);
    res.sendStatus(500);
  }
};

const postBook = async (req, res) => {
  const params = Object.values(req.body);

  if (params.length < 6) {
    res.status(400).json({ error: 'Missing fields in the request body' });
    return;
  }

  try {
    const book = await model.postBook(params);

    res.status(201).json({
      book,
    });
  } catch (error) {
    console.error('[ERROR]', error);
    res.sendStatus(500);
  }
};

const updateBook = async (req, res) => {
  const { title } = req.body;

  const bookId = req.params.id;
  const params = Object.values(req.body);

  try {
    const book = await model.updateBook(params, bookId, title);

    if (book === 'title already exists') {
      res
        .status(409)
        .json({ error: 'A book with the provided title already exists' });
      return;
    }

    if (isObjEmpty(book)) {
      return res
        .status(404)
        .json({ error: 'A book with the provided ID was not found' });
    }

    res.status(201).json({ book });
  } catch (error) {
    console.error('[ERROR]', error);
    res.sendStatus(500);
  }
};

const deleteBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await model.deleteBook(bookId);

    if (isObjEmpty(book)) {
      return res
        .status(404)
        .json({ error: 'A book with the provided ID was not found' });
    }

    res.status(201).json({ book });
  } catch (error) {
    console.error('[ERROR]', error);
    res.sendStatus(500);
  }
};

module.exports = { getAllBooks, getBookById, postBook, updateBook, deleteBook };
