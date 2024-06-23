const dbConnection = require("../utils/dbConnection.js")

const getAllBreeds = async (req, res) => {
  const db = await dbConnection.connect()
  const type = req.query.type

  try {
    const sqlQuery = "select distinct breed from pets where type = $1"
    const result = await db.query(sqlQuery, [type])

    res.json({
      breeds: result.rows
    })  
  } catch (error) {
    throw error
  } finally {
    db.release()
  }
}

module.exports = getAllBreeds