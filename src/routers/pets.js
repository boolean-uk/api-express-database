const express = require('express')
const router = express.Router()
const db = require('../../db')

// GET ALL PETS (INC. BY TYPE)
router.get('/', async (req, res) => {
    const { type } = req.query

    if (type) {
        const pet = await db.query(
            'SELECT * FROM pets WHERE type = $1',
            [type]
        )
        return res.status(200).json({ pets: pet.rows})
    }

    const pet = await db.query(
        'SELECT * FROM pets'
    )
    return res.status(200).json({ pets: pet.rows })
})

// CREATE A PET
router.post('/', async (req, res) => {
    const { name, age, type, breed, has_microchip } = req.body
    const newPet = await db.query(
        'INSERT INTO pets (name, age, type, breed, has_microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, age, type, breed, has_microchip]
    )
    return res.status(201).json({ pet: newPet.rows[0]})
})

// GET A PET BY ID
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const foundPet = await db.query(
        'SELECT * FROM pets WHERE id = $1',
        [id]
    )
    return res.status(200).json({ pet: foundPet.rows[0] })
})

// UPDATE A PET (BY ID)
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name, age, type, breed, has_microchip } = req.body
    const updatedPet = await db.query(
        'UPDATE pets SET name = $2, age = $3, type = $4, breed = $5, has_microchip = $6 WHERE ID = $1 RETURNING *',
        [id, name, age, type, breed, has_microchip]
    )
    return res.status(201).json({ pet: updatedPet.rows[0] })
})

module.exports = router