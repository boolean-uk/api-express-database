const pool = require('../../db')

const getPets = async (req, res) => {
    const db = await pool.connect()

    const sqlQuery = 'select * from pets'
    const result = await db.query(sqlQuery)

    db.release()

    res.send({ pets: result.rows })
}

const createPet = async (req, res) => {
    const db = await pool.connect()

    const { name, age, type, breed, has_microchip} = req.body

    if (
        !name ||
        !age ||
        !type ||
        !breed ||
        !typeof has_microchip === "boolean"
    ) {
        res.status(400).json({
            error: 'All fields are required and has_microchip must be a boolean',
        })
    }

    try {
        const result = await db.query(
            `INSERT INTO pets (name, age, type, breed, has_microchip) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING *`,
            [name, age, type, breed, has_microchip, ]
        )

        return res.status(201).json({ pet: result.rows[0] })
    } catch (err) {
        console.error('Error inserting pet:', err)
        return res.status(500).json({ error: 'Internal Server Error' })
    } finally {
        db.release()
    }
}

const getPetById = async (req, res) => {
    const db = await pool.connect()

    const sqlQuery = 'select * from pets where id = $1'
    const result = await db.query(sqlQuery, [Number(req.params.id)])

    db.release()

    res.send({ pet: result.rows[0] })
}

const updatePetById = async (req, res) => {
    const db = await pool.connect()

    const { name, age, type, breed, has_microchip} = req.body

    if (
        !name ||
        !age ||
        !type ||
        !breed ||
        !typeof has_microchip === "boolean"
    ) {
        res.status(400).json({
            error: 'All fields are required and has_microchip must be a boolean',
        })
    }

    try {
        const result = await db.query(
            `Update pets
             Set name = $1 , age = $2 , type = $3 , breed = $4 , has_microchip = $5
             where id = $6
             RETURNING *`,
            [name, age, type, breed, has_microchip, req.params.id]
        )

        return res.status(201).json({ pet: result.rows[0] })
    } catch (err) {
        console.error('Error inserting pet:', err)
        return res.status(500).json({ error: 'Internal Server Error' })
    } finally {
        db.release()
    }
}

const deletePetById = async (req, res) => {
    const db = await pool.connect()

    const sqlQuery = 'delete from pets where id = $1 RETURNING *'
    const result = await db.query(sqlQuery, [Number(req.params.id)])

    db.release()

    res.status(201).send({ pet: result.rows[0] })
}

module.exports = {
    getPets,
    createPet,
    getPetById,
    deletePetById,
    updatePetById,
}
