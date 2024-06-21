const express = require("express")
const router = express.Router()
const dbConnection = require("../../utils/dbConnection.js")

router.get('/', async (req, res) => {
    const db = await dbConnection.connect()

    try {
        const sqlQuery = 'select * from pets'
        const result = await db.query(sqlQuery)

        res.json({
            pets: result.rows
        })
    } catch (error) {
        console.log(error)
    } finally {
        db.release()
    }
})

router.post('/', async (req, res) => {
    const db = await dbConnection.connect()
    const { name, age, type, breed, has_microchip } = req.body

    try {
        const sqlQuery = 'insert into pets (name, age, type, breed, has_microchip) values ($1, $2, $3, $4, $5) returning *'
        const result = await db.query(sqlQuery, [name, age, type, breed, has_microchip])

        res.status(201).json({
            pet: result.rows[0]
        })
    } catch (error) {
        console.log(error)
    } finally {
        db.release()
    }
})

router.get('/:id', async (req, res) => {
    const db = await dbConnection.connect()
    const id = Number(req.params.id)

    try {
        const sqlQuery = 'select * from pets where id = $1'
        const result = await db.query(sqlQuery, [id])

        res.json({
            pet: result.rows[0]
        })
    } catch (error) {
        console.log(error)
    } finally {
        db.release()
    }
})

router.put('/:id', async (req, res) => {
    const db = await dbConnection.connect()
    const { name, age, type, breed, has_microchip } = req.body
    const id = Number(req.params.id)

    try {
        const sqlQuery = 'update pets set name = $1, age = $2, type = $3, breed = $4, has_microchip = $5 where id = $6 returning *'
        const result = await db.query(sqlQuery, [name, age, type, breed, has_microchip, id])

        res.status(201).json({
            pet: result.rows[0]
        })
    } catch (error) {
        console.log(error)
    } finally {
        db.release()
    }
})

router.delete('/:id', async (req, res) => {
    const db = await dbConnection.connect()
    const id = Number(req.params.id)

    try {
        const sqlQuery = 'delete from pets where id = $1 returning *'
        const result = await db.query(sqlQuery, [id])

        res.status(201).json({
            pet: result.rows[0]
        })
    } catch (error) {
        console.log(error)
    } finally {
        db.release()
    }
})

module.exports = router
