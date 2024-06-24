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

async function updatePetById(id, updatedParams) {
    const sqlQuery = 'UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, has_microchip = $5 RETURNING *;'

    try {
        const result = await db.query(sqlQuery, [updatedParams.name, updatedParams.age, updatedParams.type, updatedParams.breed, updatedParams.has_microchip])
        return result.rows[0]
    } catch (e) {
        console.log(e)
    }
}

module.exports = { fetchAllPets, fetchPetById, updatePetById }

