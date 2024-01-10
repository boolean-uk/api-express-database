const db = require("../../db");

let pets;
let select_query = "SELECT * FROM pets";


const getAllPets = async () => {
    pets = await db.query(select_query)
    return pets.rows
}

module.exports = {
    getAllPets
}