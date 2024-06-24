const MissingFieldsError = require('../errors/missingFieldsError.js')
const NotFoundError = require('../errors/notFoundError.js')
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
    if (!verifyFields(pet)) {
        throw new MissingFieldsError('Missing fields in request body')
    }

    const sqlQuery = `insert into pets (name, age, type, breed, has_microchip) values ($1, $2, $3, $4, $5) returning *`
    const result = await dbConnection.query(sqlQuery, [pet.name, pet.age, pet.type, pet.breed, pet.has_microchip])

    return result.rows[0]
}

const getPetById = async (id) => {
    const sqlQuery = `select * from pets where id = $1`
    const result = await dbConnection.query(sqlQuery, [id])

    if(result.rows.length === 0) {
        throw new NotFoundError('A pet with the provided ID does not exist')
    }

    return result.rows[0]
}

const updatePet = async (id, petInfo) => {
    if (!verifyFields(petInfo)) {
        throw new MissingFieldsError('Missing fields in request body')
    }

    const sqlQuery = `update pets set name = $1, age = $2, type = $3, breed = $4, has_microchip = $5 where id = $6 returning *`
    const result = await dbConnection.query(sqlQuery, [petInfo.name, petInfo.age, petInfo.type, petInfo.breed, petInfo.has_microchip, id])

    if(result.rows.length === 0) {
        throw new NotFoundError('A pet with the provided ID does not exist')
    }

    return result.rows[0]
}

const deletePetById = async (id) => {
    const sqlQuery = `delete from pets where id = $1 returning *`
    const result = await dbConnection.query(sqlQuery, [id])

    if(result.rows.length === 0) {
        throw new NotFoundError('A pet with the provided ID does not exist')
    }

    return result.rows[0]
}

const getAllBreeds = async (type) => {
    if (!type) {
        throw new MissingFieldsError('Animal type is required')
    }

    const sqlQuery = `select distinct breed from pets where type = $1`
    const result = await dbConnection.query(sqlQuery, [type])

    return result.rows
}

function verifyFields(object) {
    const neededProperties = ['name', 'age', 'type', 'breed', 'has_microchip']

    for (const item of neededProperties) {
        if (object[item] === undefined) {
            return false
        }
    }

    return true
}

module.exports = {
    getAllPets,
    createPet,
    getPetById,
    updatePet,
    deletePetById,
    getAllBreeds
}