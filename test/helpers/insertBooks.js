const fs = require('fs/promises')
const client = require("../../src/utils/dbConnection.js");

const insertBooks = async () => {
  const sqlDataForBooks = await fs.readFile('./sql/insert-books.sql')
  const sqlStringForBooks = sqlDataForBooks.toString()

  await client.query(sqlStringForBooks)
}

module.exports = insertBooks
