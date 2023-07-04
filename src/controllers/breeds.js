const db = require("../repos/breeds");

const getBreeds = async (req, res)=> {
    let { type } = req.query;
    const result = await db.getBreeds(type)
    res.json({breeds: result.rows});
}

module.exports = { getBreeds };