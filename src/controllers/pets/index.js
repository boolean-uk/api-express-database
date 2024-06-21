const { findSourceMap } = require('module')
const dbConnection = require('../../utils/dbConnection.js')

const getAllPets = async () => {
    const db = await dbConnection.connect()
    try {
        const sqlQuery = 'select * from pets'
        const result = await db.query(sqlQuery)

        return result.rows
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

const addPet = async (req) => {
    const db = await dbConnection.connect()
    try {
        const sqlQuery = 'insert into pets (name, age, type, breed, has_microchip) values($1, $2, $3, $4, $5) returning *'
        const result = await db.query(sqlQuery, [req.body.name, Number(req.body.age), req.body.type, req.body.breed, Boolean(req.body.has_microchip)])

        return result.rows[0]
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

module.exports = {
    getAllPets,
    addPet
}