const fs = require("fs/promises");
const dbConnection = require("../../db/index");

const insertBooks = async () => {
  const sqlDataForBooks = await fs.readFile("./sql/insert-books.sql");
  const sqlStringForBooks = sqlDataForBooks.toString();

  await dbConnection.query(sqlStringForBooks);
};

module.exports = insertBooks;
