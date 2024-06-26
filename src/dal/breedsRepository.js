const db = require("../../db/index.js");

async function fetchBreeds(query) {

    sqlQuery = 'SELECT breed FROM pets WHERE type = $1 GROUP BY breed'
    const result = await db.query(sqlQuery, [query.type])
    return result.rows
}

module.exports = { fetchBreeds }