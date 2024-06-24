const fs = require("fs/promises");
const dbConnection = require("../../db/index");

global.beforeEach(async () => {
  const sqlDataForBooks = await fs.readFile("./sql/create-books.sql");
  const sqlStringForBooks = sqlDataForBooks.toString();

  await dbConnection.query(sqlStringForBooks);

  const sqlDataForPets = await fs.readFile("./sql/create-pets.sql");
  const sqlStringForPets = sqlDataForPets.toString();

  await dbConnection.query(sqlStringForPets);
});
