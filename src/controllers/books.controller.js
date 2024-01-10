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
  const response = await books.getBookById(Number(req.params.id))
  res.json(response)
}

module.exports = {
  getAllBooks,
  getBookById,
};
