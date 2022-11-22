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

global.afterAll(async () => {
  const sqlInsertBooks = await fs.readFile('./sql/insert-books.sql')
  await client.query(sqlInsertBooks.toString())
  console.log(sqlInsertBooks)
  const sqlInsertPets = await fs.readFile('./sql/insert-pets.sql')
  await client.query(sqlInsertPets.toString())
})