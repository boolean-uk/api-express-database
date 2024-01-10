const express = require('express')
const router = express.Router()
const db = require('../../db')

// GET ALL PETS (INC. BY TYPE)
router.get('/', async (req, res) => {
    const { type, page, perPage } = req.query

    let select_query = 'SELECT * FROM pets'
    let pet
    if (type) {
        pet = await db.query(
            select_query.concat(' WHERE type = $1'),
            [type])
    }
    pet = await db.query(select_query)

    // EXTENSION SEPARATION
    let pageQuery = Number(page) || 1
    let per_page = Number(perPage) || 20
    
    if (perPage < 10 || perPage > 50) {
        return res.status(400).json({ error: `parameter invalid perPage: ${perPage} not valid. Accepted range is 10 - 50` })
    }
    if (!perPage && !page) {
        pet = await db.query(
            select_query.concat(' LIMIT $1'),
            [per_page])
    }
    if (perPage && !page) {
        pet = await db.query(
            select_query.concat(' LIMIT $1'),
            [per_page])
    }
    if (!perPage && page) {
        pet = await db.query(
            select_query.concat(' LIMIT $1 OFFSET $2'),
            [per_page, per_page * (pageQuery -1)])
    }
    if (perPage && page) {
        pet = await db.query(
            select_query.concat(' LIMIT $1 OFFSET $2'),
            [per_page, per_page * (pageQuery -1)])
    }
    
    return res.status(200).json({ pets: pet.rows, per_page: per_page, page: pageQuery })
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

// DELETE A PET (BY ID)
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const deletedPet = await db.query(
        'DELETE FROM pets WHERE id = $1 RETURNING *',
        [id]
    )
    return res.status(201).json({ pet: deletedPet.rows[0] })
})

module.exports = router