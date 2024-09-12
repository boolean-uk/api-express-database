const client = require("../../db");

const createPet = async (values) => {
  const sqlString = `INSERT INTO "pets" (name, age, type, breed, has_microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *;`
  const query = {
    text: sqlString,
    values: Object.values(values)
  }
  const result = await client.query(query)

  return result.rows[0]
}

module.exports = createPet
