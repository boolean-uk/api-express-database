const db = require("../../db");

const getAllBreedsRep = async (cond) => {
    const breed = await db.query(
        'SELECT DISTINCT breed FROM pets WHERE type = $1', [cond]
    )
    return breed
}

module.exports = getAllBreedsRep