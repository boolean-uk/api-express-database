const fs = require("fs/promises");
const dbConnection = require("../../db/index");

const insertPets = async () => {
  const sqlDataForPets = await fs.readFile("./sql/insert-pets.sql");
  const sqlStringForPets = sqlDataForPets.toString();

  await dbConnection.query(sqlStringForPets);
};

module.exports = insertPets;
