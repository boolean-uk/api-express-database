const db = require("../../db/index.js");
const stmtHelper = require("../helpers/statementHelpers.js");

const Types = require("../types.d.js");

/**
 *
 * @param { Types.FilterValues } [filter]
 * @returns { Promise<{books: Types.ExistingBookValues[]}> }
 */
async function getBooks(filter) {
  if (!filter || Object.keys(filter).length === 0) {
    filter = undefined
  }
  const stmt = stmtHelper.selectStmt("books", filter);
  const result = await db.query(stmt);
  return { books: result.rows };
}

/**
 *
 * @param { Number } id
 * @returns { Promise<{ book: Types.ExistingBookValues }> }
 */
async function getBookById(id) {
  const result = await getBooks({ id });
  return { book: result.books[0] };
}

/**
 *
 * @param { Types.BookValues } values
 * @returns { Promise<{ book: Types.ExistingBookValues }> }
 */
async function insertBook(values) {
  const stmt = stmtHelper.insertRowStmt("books", values);
  const result = await db.query(stmt);
  return { book: result.rows[0] };
}

/**
 *
 * @param {Types.ExistingBookValues} values
 * @returns { Promise<{book: Types.ExistingBookValues}> }
 */
async function updateBook(values) {
  const stmt = stmtHelper.updateRowStmt("books", values);
  const result = await db.query(stmt);
  return { book: result.rows[0] };
}

/**
 *
 * @param { Number } id
 * @returns { Promise<{book: Types.ExistingBookValues}> }
 */
async function deleteBook(id) {
  const stmt = stmtHelper.deleteRowStmt("books", id);
  const result = await db.query(stmt);
  return { book: result.rows[0] };
}

module.exports = {
  getBooks,
  getBookById,
  insertBook,
  updateBook,
  deleteBook,
};
