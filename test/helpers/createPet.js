const client = require("../../db");

const createPet = async (values) => {
  const sqlString = `INSERT INTO "pets" (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *;`

  const result = await client.query(sqlString, values)

  return result.rows[0]
}

module.exports = createPet
