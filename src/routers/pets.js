const express = require('express')
const router = express.Router()
const db = require("../../db")



router.get('/', async (req, res) => {
    const sqlQuery = `select * from pets`
    const result = await db.query(sqlQuery)
    res.json({
        pets: result.rows
    })
})

router.post('/', async (req, res) => {
    const sqlQuery = `INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *`
    const result = await db.query(sqlQuery, [req.body.name, req.body.age, req.body.type, req.body.breed, req.body.microchip])
    res.status(201).json({
        pet: result.rows[0]
    })
})

router.get('/:id', async (req, res) => {
    const sqlQuery = `select * from pets WHERE id = $1`
    const result = await db.query(sqlQuery, [req.params.id])
    res.json({
        pet: result.rows[0]
    })
})

router.put("/:id", async (req, res) => {
    const id = req.params.id
    const sqlQuery = `UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, microchip = $5 WHERE id = $6 RETURNING *`
    const input = [req.body.name, req.body.age, req.body.type, req.body.breed, req.body.microchip, id]
    const result = await db.query(sqlQuery, input)
    res.status(201).json({ pet: result.rows[0] })
})


router.delete("/:id", async (req, res) => {
    const id = req.params.id
    const sqlQuery = `DELETE FROM pets WHERE id = $1 RETURNING *`
    const result = await db.query(sqlQuery, [req.params.id])
    res.status(201).json({ pet: result.rows[0] })
})


module.exports = router
