const db = require("../../db");

const getAllBreedsRep = require('../repositories/breeds.js')

const getAllBreeds = async (req, res) => {
    const { type } = req.query
    let breed = await getAllBreedsRep(type)
    return res.status(200).json({ breeds: breed.rows })
}

module.exports = getAllBreeds