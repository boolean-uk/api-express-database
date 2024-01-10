const books = require("../repositories/books.repository.js");

const Types = require("../types.d.js");

/**
 *
 * @param { Types.Request } req
 * @param { Types.Response } res
 * @returns { void }
 */
function getAllBooks(req, res) {
  const response = books.getBooks(req.query)
  res.json(response)
}
