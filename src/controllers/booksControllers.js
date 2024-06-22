const { MissingFieldsError } = require("../errors/errors");
const { fetchBooks, postBook } = require('../repos/bookRepository')

async function getAllBooks(req, res, next) {
    const books = await fetchBooks()
    res.status(200).json({ books })
}

async function addBook(req, res, next) {
  const book = req.body;
  const requiredProperties = [
    "title",
    "type",
    "author",
    "topic",
    "publication_date",
    "pages",
  ];
  
  try {
    const allFieldsExist = requiredProperties.every((property) => book[property]);
    if (!allFieldsExist) {
        throw new MissingFieldsError('Books require a title, type, author, topic, publication year, and number of pages')
    }
    postBook(book)
    res.status(201).json({ book })
  } catch(e) {
    console.log('Error creating book', e)
    next(e)
  }
}

module.exports = { addBook, getAllBooks };
