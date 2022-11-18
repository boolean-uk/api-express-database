const fs = require('fs/promises')
const client = require("../../db");

global.beforeEach(async() => {
  const data = await fs.readFile('./sql/create-books.sql')
  const sqlString = data.toString()

  await client.query(sqlString)
})
