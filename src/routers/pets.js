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

    try {
        const result = await dbClient.query(sqlQuery, values)

        res.status(201).json({
            pet: result.rows[0]
        })
    } catch(err) {
        console.log('Error inserting book:', err)
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }

})

router.get('/', async (req, res) => {
    const sqlQuery = 'select * from pets'

    try {
        const result = await dbClient.query(sqlQuery)

        res.status(200).json({
            pets: result.rows
        })
    } catch(err) {
        console.log('Error fetching books:', err)
        res.status(500).json({
            error: 'Internal Server Error'
        }) 
    }

})

module.exports = router

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const sqlQuery = `select * from pets where id = $1`

    try {
        const result = await dbClient.query(sqlQuery, [id])

        if (result.rows.length === 0) {
            res.status(404).json({
                error: 'book not found'
            })
        } else {
            res.status(200).json({
                pet: result.rows[0]
            })
        }

    } catch(err) {
        console.log('Error fetching book:', err)
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }

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

    try {
        const result = await dbClient.query(sqlQuery, values)

        if (result.rows.length === 0) {
            res.status(404).json({
                error: 'book not found'
            })
        } else {
            res.status(201).json({
                pet: result.rows[0]
            })
        }
    } catch(err) {
        console.log('Error updating book:', err)
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }

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

    try {
        const result = await dbClient.query(sqlQuery, values)

        if (result.rows.length === 0) {
            res.status(404).json({
                error: 'book not found'
            })
        } else {
            res.status(201).json({
                pet: result.rows[0]
            })
        }
    } catch(err) {
        console.log('Error deleting book:', err)
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }

})

module.exports = router