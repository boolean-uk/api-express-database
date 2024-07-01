const express = require('express')
const router = express.Router()
const dbClient = require('../../db')
const { pet1, pet2 } = require("../../test/fixtures/petData.js")


router.post('/', async (req, res) => {
    const sqlQuery = `
    INSERT INTO pets (name, age, type, breed, has_microchip)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `

    const values = [
        pet1.name,
        pet1.age,
        pet1.type,
        pet1.breed,
        pet1.has_microchip
    ]

    const result = await dbClient.query(sqlQuery, values)

    res.status(201).json({
        pet: result.rows[0]
    })
})

router.get('/', async (req, res) => {
    const sqlQuery = 'select * from pets'

    const result = await dbClient.query(sqlQuery)

    res.status(200).json({
        pets: result.rows
    })
})

module.exports = router

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const sqlQuery = `select * from pets where id = $1`

    const result = await dbClient.query(sqlQuery, [id])

    res.status(200).json({
        pet: result.rows[0]
    })
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name, age, type, breed, has_microchip } = req.body
    const sqlQuery = `
        update pets
        set name = $1, age = $2, type = $3, breed = $4, has_microchip = $5
        where id = $6
        RETURNING *
    `

    const values = [
        pet2.name,
        pet2.age,
        pet2.type,
        pet2.breed,
        pet2.has_microchip,
        id
    ]

    const result = await dbClient.query(sqlQuery, values)

    res.status(201).json({
        pet: result.rows[0]
    })
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const sqlQuery = `
        delete from pets
        where id = $1
        RETURNING *
    `

    const values = [
        id
    ]

    const result = await dbClient.query(sqlQuery, values)

    res.status(201).json({
        pet: result.rows[0]
    })
})

module.exports = router