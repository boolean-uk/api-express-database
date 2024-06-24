const dbConnection = require('../utils/dbConnection.js')

const getAllPets = async (type, pages, perpages) => {
    let page = 1
    let perpage = 20
    let offset = 0

    if (pages) {
        page = pages
        offset = (page - 1) * perpage
    }

    if (perpages > 9 && perpages < 51) {
        perpage = perpages
        offset = (page - 1) * perpage
    }

    if (type) {
        const sqlQuery = `select * from pets where type = $1 limit $2 offset $3`
        const result = await dbConnection.query(sqlQuery, [type, perpage, offset])

        return result.rows
    }

    const sqlQuery = 'select * from pets limit $1 offset $2'
    const result = await dbConnection.query(sqlQuery, [perpage, offset])

    return result.rows
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