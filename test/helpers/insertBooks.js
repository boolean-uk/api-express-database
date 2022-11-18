const fs = require('fs/promises')
const client = require("../../db");

const insertBooks = async () => {
  const sqlDataForBooks = await fs.readFile('./sql/insert-books.sql')
  const sqlStringForBooks = sqlDataForBooks.toString()

  await client.query(sqlStringForBooks)
}

module.exports = insertBooks
