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

    const name = req.body.name
    const age = Number(req.body.age)
    const type = req.body.type
    const breed = req.body.breed
    const mchip = Boolean(req.body.has_microchip)
    try {
        const sqlQuery = 'insert into pets (name, age, type, breed, has_microchip) values($1, $2, $3, $4, $5) returning *'
        const result = await db.query(sqlQuery, [name, age, type, breed, mchip])

        return result.rows[0]
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

const getPetByID = async(req) => {
    const id = Number(req.params.id)
    const db = await dbConnection.connect()
    try {
        const sqlQuery = 'select * from pets where id ='+id
        const result = await db.query(sqlQuery)
        return result.rows[0]
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

const updatePet = async(req) => {
    const db = await dbConnection.connect()

    const id = Number(req.params.id)
    const name = req.body.name
    const age = Number(req.body.age)
    const type = req.body.type
    const breed = req.body.breed
    const mchip = Boolean(req.body.has_microchip)
    try {
        const sqlQuery = `update pets set name = $1, age = $2, type = $3, breed = $4, has_microchip = $5 where id=$6 returning *`
        const result = await db.query(sqlQuery, [name, age, type, breed, mchip, id])

        return result.rows[0]
    } catch (e) {
        console.log(e)
    } finally {
        db.release()
    }
}

const deletePet = async (req) => {
    const id = Number(req.params.id)
    const db = await dbConnection.connect()

    try {
        const sqlQuery = 'delete from pets where id=$1 returning *'
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
    addPet,
    getPetByID,
    updatePet,
    deletePet
}