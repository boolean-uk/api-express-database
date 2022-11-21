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
    res.json({
        pet: result.rows
    })
})

router.get('/:id', async (req, res) => {
    const sqlQuery = `select * from pets WHERE id = $1`
    const result = await db.query(sqlQuery, [req.params.id])
    res.json({
        pet: result.rows
    })
})

router.put("/:id", async (req, res) => {
    const id = req.params.id
    const sqlQuery = `UPDATE pets SET name = $1, age = $2, type = $3, breed = $4, microchip = $5 RETURNING *`
    const result = await db.query(sqlQuery, [req.params.title, req.params.type, req.params.author, req.params.topic, newDate, req.params.pages])
    res.json({ pet: result.rows })
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id
    const sqlQuery = `DELETE FROM pets WHERE id = $1;`
    const result = await db.query(sqlQuery, [req.params.id])
    res.json({ pet: result.rows })
})


module.exports = router
