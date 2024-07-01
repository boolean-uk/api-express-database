const fs = require('fs/promises')
const dbClient = require("../../db");

const insertBooks = async () => {
  const sqlDataForBooks = await fs.readFile("../../sql/insert-books.sql")
  const sqlStringForBooks = sqlDataForBooks.toString()

  await dbClient.query(sqlStringForBooks)
}

module.exports = insertBooks
