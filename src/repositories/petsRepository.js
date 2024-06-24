const pool = require('../../db')

const getPets = async () => {
    const db = await pool.connect()

    const sqlQuery = 'select * from pets'
    const result = await db.query(sqlQuery)

    db.release()

    return result
}

const createPet = async (req) => {
    const db = await pool.connect()

    const { name, age, type, breed, has_microchip } = req.body

    const result = await db.query(
        `INSERT INTO pets (name, age, type, breed, has_microchip) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING *`,
        [name, age, type, breed, has_microchip]
    )

    db.release()

    return result
}

const getPetById = async (req) => {
    const db = await pool.connect()

    const sqlQuery = 'select * from pets where id = $1'
    const result = await db.query(sqlQuery, [Number(req.params.id)])

    db.release()

    return result
}

const updatePetById = async (req) => {
    const db = await pool.connect()

    const { name, age, type, breed, has_microchip } = req.body

    const result = await db.query(
        `Update pets
             Set name = $1 , age = $2 , type = $3 , breed = $4 , has_microchip = $5
             where id = $6
             RETURNING *`,
        [name, age, type, breed, has_microchip, req.params.id]
    )

    db.release()
    
    return result
}

const deletePetById = async (req, res) => {
    const db = await pool.connect()

    const sqlQuery = 'delete from pets where id = $1 RETURNING *'
    const result = await db.query(sqlQuery, [Number(req.params.id)])

    db.release()

    return result
}

module.exports = {
    getPets,
    createPet,
    getPetById,
    deletePetById,
    updatePetById,
}
