const db = require("../../db/index.js");
const stmtHelper = require("../helpers/statementHelpers.js");

const Types = require("../types.d.js");

/**
 *
 * @param { Types.FilterValues } [filter]
 * @returns { Promise<Object[]> }
 */
async function getBooks(filter) {
  const stmt = stmtHelper.selectStmt("books", filter);
  const result = await db.query(stmt);
  return result.rows;
}

/**
 *
 * @param { Types.BookValues } values
 */
async function insertBook(values) {
  const stmt = stmtHelper.insertRowStmt("books", values);
  const result = await db.query(stmt);
  return result.rows[0]
}

module.exports = {
  getBooks,
  insertBook
}
