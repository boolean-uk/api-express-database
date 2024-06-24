const db = require("../../db/index.js");

async function fetchAllPets() {
    const sqlQuery = 'SELECT * FROM pets'
    
    try {
        const pets = await db.query(sqlQuery)
        return pets.rows
    } catch (e) {
        console.log(e)
    }
}

async function fetchPetById(id) {
    const sqlQuery = 'SELECT * FROM pets WHERE id = $1'

    try {
        const pets = await db.query(sqlQuery, [id])
        return pets.rows[0]
    } catch (e) {
        console.log(e)
    }
}

module.exports = { fetchAllPets, fetchPetById }

