const dbConnection = require('../utils/dbConnection.js')

const getAllPets = async (type) => {
    const db = await dbConnection.connect()

    try {
        if (type) {
            const sqlQuery = `select * from pets where type = $1`
            const result = await db.query(sqlQuery, [type])

            return result.rows
        }

        const sqlQuery = 'select * from pets'
        const result = await db.query(sqlQuery)

        return result.rows
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

const createPet = async (pet) => {
    const db = await dbConnection.connect()

    try {
        const sqlQuery = `insert into pets (name, age, type, breed, has_microchip) values ($1, $2, $3, $4, $5) returning *`
        const result = await db.query(sqlQuery, [pet.name, pet.age, pet.type, pet.breed, pet.has_microchip])

        return result.rows[0]
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

const getPetById = async (id) => {
    const db = await dbConnection.connect()

    try {
        const sqlQuery = `select * from pets where id = $1`
        const result = await db.query(sqlQuery, [id])

        return result.rows[0]
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

const updatePet = async (id, petInfo) => {
    const db = await dbConnection.connect()

    try {
        const sqlQuery = `update pets set name = $1, age = $2, type = $3, breed = $4, has_microchip = $5 where id = $6 returning *`
        const result = await db.query(sqlQuery, [petInfo.name, petInfo.age, petInfo.type, petInfo.breed, petInfo.has_microchip, id])

        return result.rows[0]
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

const deletePetById = async (id) => {
    const db = await dbConnection.connect()

    try {
        const sqlQuery = `delete from pets where id = $1 returning *`
        const result = await db.query(sqlQuery, [id])

        return result.rows[0]
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

module.exports = {
    getAllPets,
    createPet,
    getPetById,
    updatePet,
    deletePetById
}