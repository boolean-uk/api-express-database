const fs = require('fs/promises')
const dbClient = require("../../db");

const insertPets = async () => {
  const sqlDataForPets = await fs.readFile('../../sql/insert-pets.sql')
  const sqlStringForPets = sqlDataForPets.toString()

  await dbClient.query(sqlStringForPets)
}

module.exports = insertPets
