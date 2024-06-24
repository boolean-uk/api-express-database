const dbConnection = require("../utils/dbConnection.js")

const getAllBreeds = async (req, res) => {
  const type = req.query.type
  const sqlQuery = "select distinct breed from pets where type = $1"
  const result = await dbConnection.query(sqlQuery, [type])

  res.json({
    breeds: result.rows
  })  
}

module.exports = getAllBreeds
