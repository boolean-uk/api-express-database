const dbClient = require("../../db/index.js");

const getAllPets = async () => {
    const db = await dbClient.connect()

    try {
        const sqlQuery = 'SELECT * FROM pets'
        const result = await db.query(sqlQuery)
        
        return result.rows
    }
    catch (error) {
        console.log(error)
    }
    finally {
        db.release()
    }
}

const addPet = async (info) => {
    const db = await dbClient.connect()
    const { name, age, type, breed, has_microchip } = info

    try {
        const sqlQuery = `INSERT INTO pets (name, age, type, breed, has_microchip) 
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`
        const postedData = await db.query(sqlQuery, [ name, age, type, breed, has_microchip ])
        return postedData.rows[0]
    }
    catch (error) {
        console.log(error)
    }
    finally {
        db.release()
    }
}

const getPet = async (id) => {
    const db = await dbClient.connect()

    try {
        const sqlQuery = `SELECT * FROM pets 
        WHERE id = $1`
        const result = await db.query(sqlQuery, [Number(id)])
        
        return result.rows[0]
    }
    catch (error) {
        console.log(error)
    }
    finally {
        db.release()
    }
}

const updatePet = async (id, info) => {
    const db = await dbClient.connect()
    const { name, age, type, breed, has_microchip } = info
    try {
        const sqlQuery = `UPDATE pets
        SET name = $2, age = $3, type = $4, breed = $5, has_microchip = $6
        WHERE id = $1
        RETURNING *`
        const result = await db.query(sqlQuery, [ Number(id), name, age, type, breed, has_microchip ])
        
        return result.rows[0]
    }
    catch (error) {
        console.log(error)
    }
    finally {
        db.release()
    }
}

const deletePet = async (id) => {
    const db = await dbClient.connect()

    try {
        const sqlQuery = 'DELETE FROM pets WHERE id = $1 RETURNING *'
        const result = await db.query(sqlQuery, [Number(id)])
        
        return result.rows[0]
    }
    catch (error) {
        console.log(error)
    }
    finally {
        db.release()
    }

}

module.exports = {
    getAllPets,
    addPet,
    getPet,
    updatePet,
    deletePet
}