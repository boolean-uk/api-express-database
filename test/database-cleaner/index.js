const fs = require('fs/promises')
const client = require("../../db");

global.beforeEach(async() => {
  const sqlDataForBooks = await fs.readFile('./sql/create-books.sql')
  const sqlStringForBooks = sqlDataForBooks.toString()

  await client.query(sqlStringForBooks)

  const sqlDataForPets = await fs.readFile('./sql/create-pets.sql')
  const sqlStringForPets = sqlDataForPets.toString()

  await client.query(sqlStringForPets)
})
