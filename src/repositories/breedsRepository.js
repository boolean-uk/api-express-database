const db = require('../../db')

const getAllBreeds = async (values) => {
  let str = 'SELECT DISTINCT breed FROM pets WHERE type = $1'
  const data = await db.query(str, values)
  const breeds = data.rows
  return breeds
}

module.exports = {
  getAllBreeds
}