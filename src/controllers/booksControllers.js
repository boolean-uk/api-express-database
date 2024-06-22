const { MissingFieldsError, NoDataError } = require("../errors/errors");
const { fetchBooks, postBook, fetchBookById } = require('../dal/bookRepository')

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
    console.log(e)
    next(e)
  }
}

async function getBookById(req, res, next) {
    targetBookId = Number(req.params.id)
    try {
        const book = await fetchBookById(targetBookId)
        if (book.length === 0) {
            throw new NoDataError('A book with the provided ID does not exist') 
        }
        res.status(200).json({ book })
    } catch(e) {
        console.log(e)
        next(e)
    }
}

module.exports = { addBook, getAllBooks, getBookById };
