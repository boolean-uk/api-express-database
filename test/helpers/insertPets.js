const fs = require('fs/promises')
const client = require('../../src/utils/dbConnection.js');

const insertPets = async () => {
  const sqlDataForPets = await fs.readFile('./sql/insert-pets.sql')
  const sqlStringForPets = sqlDataForPets.toString()

  await client.query(sqlStringForPets)
}

module.exports = insertPets
