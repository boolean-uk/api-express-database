const books = require("../repositories/books.repository.js");

const Types = require("../types.d.js");

/**
 *
 * @param { Types.Request } req
 * @param { Types.Response } res
 * @returns { Promise<void> }
 */
async function getAllBooks(req, res) {
  const response = await books.getBooks(req.query);
  res.json(response);
}

/**
 *
 * @param { Types.Request } req
 * @param { Types.Response } res
 * @returns { Promise<void> }
 */
async function getBookById(req, res) {
  const response = await books.getBookById(Number(req.params.id));
  res.json(response);
}

/**
 *
 * @param { Types.Request } req
 * @param { Types.Response } res
 * @returns { Promise<void> }
 */
async function createBook(req, res) {
  const response = await books.insertBook(req.body);
  res.status(201).json(response);
}

/**
 *
 * @param { Types.Request } req
 * @param { Types.Response } res
 * @returns { Promise<void> }
 */
async function putBook(req, res) {
  req.body.id = req.params.id
  const response = await books.updateBook(req.body);
  res.status(201).json(response);
}

/**
 *
 * @param { Types.Request } req
 * @param { Types.Response } res
 * @returns { Promise<void> }
 */
async function deleteBook(req, res) {
  const response = await books.deleteBook(Number(req.params.id));
  res.status(201).json(response)
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  putBook,
  deleteBook,
};
